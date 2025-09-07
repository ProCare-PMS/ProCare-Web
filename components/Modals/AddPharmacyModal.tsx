"use client";
import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import SwalToaster from "@/components/SwalToaster/SwalToaster";

type AddPharmacyModalProps = {
  onClose: () => void;
};

interface PharmacyForm {
  pharmacyId: string;
  pharmacyName: string;
  location: string;
  contact: string;
  email: string
}

const AddPharmacyModal = ({ onClose }: AddPharmacyModalProps) => {
  const [formData, setFormData] = useState<PharmacyForm>({
    pharmacyId: "",
    pharmacyName: "",
    location: "",
    contact: "",
    email: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pharmacyFound, setPharmacyFound] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null); // Create a ref for the modal content

  // Optional: Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Define proper types for pharmacy data based on actual API response
  interface PharmacyData {
    id: string;
    facility_name: string;
    facility_number: string;
    facility_email: string;
    address: string;
    city: string;
    region: string;
    ghana_post_address: string;
    license_number: string;
    custom_pharmacy_id: string;
    profile_image: string | null;
  }

  interface PharmacySearchResponse {
    results?: PharmacyData[];
    count?: number;
    total_pages?: number;
    links?: {
      next: string | null;
      previous: string | null;
    };
  }

  // Query to search for pharmacy
  const searchPharmacyQuery = useQuery({
    queryKey: ["searchPharmacy", formData.pharmacyId],
    queryFn: async () => {
      if (!formData.pharmacyId.trim())
        return { results: [] } as PharmacySearchResponse;

      // Make the API call to the correct endpoint
      const response = await customAxios.get(endpoints.searchPharmacy);
      return response.data as PharmacySearchResponse;
    },
    enabled: false, // Don't run automatically
    refetchOnWindowFocus: false,
  });

  // Function to handle search
  const searchPharmacy = async (pharmacyId: string) => {
    if (!pharmacyId.trim()) {
      resetForm();
      return;
    }

    setIsLoading(true);
    try {
      const result = await searchPharmacyQuery.refetch();
      const data = result.data as PharmacySearchResponse;

      if (data && data.results && data.results.length > 0) {
        // Find pharmacy with matching custom_pharmacy_id
        const foundPharmacy = data.results.find(
          (pharmacy) => pharmacy.custom_pharmacy_id === pharmacyId
        );

        if (foundPharmacy) {
          setFormData({
            pharmacyId: pharmacyId,
            pharmacyName: foundPharmacy.facility_name || "",
            location:
              `${foundPharmacy.address}, ${foundPharmacy.city}, ${foundPharmacy.region}` ||
              "",
            contact: foundPharmacy.facility_number || "",
            email: foundPharmacy.facility_email ||""
          });
          setPharmacyFound(true);
        } else {
          resetFormExceptId(pharmacyId);
          setPharmacyFound(false);
        }
      } else {
        resetFormExceptId(pharmacyId);
        setPharmacyFound(false);
      }
    } catch (error) {
      console.error("Error searching for pharmacy:", error);
      resetFormExceptId(pharmacyId);
      setPharmacyFound(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pharmacy ID change with debounce
  const handlePharmacyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pharmacyId = e.target.value;
    setFormData((prev) => ({ ...prev, pharmacyId }));

    if (pharmacyId.trim() === "") {
      resetForm();
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Debounce the search function
    const timeoutId = setTimeout(() => {
      searchPharmacy(pharmacyId);
    }, 300);

    // Cleanup function to clear timeout if component unmounts or id changes again
    return () => clearTimeout(timeoutId);
  };

  const resetForm = () => {
    setFormData({
      pharmacyId: "",
      pharmacyName: "",
      location: "",
      contact: "",
      email: ""
    });
    setPharmacyFound(false);
    setIsLoading(false);
  };

  const resetFormExceptId = (id: string) => {
    setFormData({
      pharmacyId: id,
      pharmacyName: "",
      location: "",
      email: "",
      contact: "",
    });
  };

  // Mutation for adding pharmacy
  const addPharmacyMutation = useMutation({
    mutationFn: async (data: {
      pharmacy_id: string;
      pharmacy_name: string;
      location: string;
      contact: string;
      pharmacy_email: string
    }) => {
      const response = await customAxios.post(
        endpoints.otherPharmacies,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["otherPharmacies"] });
      onClose();
      SwalToaster("Pharmacy added successfully!", "success");
    },
    onError: (error: any) => {
      console.error("Add pharmacy error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to add pharmacy. Please try again.";
      SwalToaster(errorMessage, "error");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.pharmacyId) {
      SwalToaster("Please enter a Pharmacy ID!", "error");
      return;
    }

    // If pharmacy was found and fields are pre-populated, submit directly
    if (pharmacyFound) {
      addPharmacyMutation.mutate({
        pharmacy_id: formData.pharmacyId,
        pharmacy_name: formData.pharmacyName,
        location: formData.location,
        contact: formData.contact,
        pharmacy_email: formData.email
      });
    } else {
      SwalToaster("Pharmacy not found with this ID.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"> {/* Added animate-fadeIn */}
      <div
        ref={modalRef} // Assign ref to the modal content
        className="bg-white shadow-custom w-[70%] py-4 px-8 mb-12 rounded-[8px] mt-8 grid gap-y-5 transform transition-all duration-300 ease-out animate-slideInFromBottom" // Added animate-slideInFromBottom and transition classes
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-bold text-2xl font-inter">Add Pharmacy</h3>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-y-2">
              <label
                htmlFor="pharmacyId"
                className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
              >
                Pharmacy ID
              </label>
              <input
                type="text"
                name="pharmacyId"
                id="pharmacyId"
                value={formData.pharmacyId}
                onChange={handlePharmacyIdChange}
                className="text-[#858C95] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                placeholder="Enter pharmacy ID"
              />
            </div>
            <div className="grid gap-y-2">
              <label
                htmlFor="pharmacyName"
                className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
              >
                Pharmacy Name
              </label>
              <input
                readOnly
                type="text"
                name="pharmacyName"
                id="pharmacyName"
                value={formData.pharmacyName}
                className="text-[#858C95] bg-[#EAEBF0] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                placeholder="Pharmacy Name"
              />
            </div>
            <div className="grid gap-y-2">
              <label
                htmlFor="location"
                className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
              >
                Location
              </label>
              <input
                readOnly
                type="text"
                name="location"
                id="location"
                value={formData.location}
                className="text-[#858C95] bg-[#EAEBF0] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                placeholder="Location"
              />
            </div>
            <div className="grid gap-y-2">
              <label
                htmlFor="contact"
                className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
              >
                Contact
              </label>
              <input
                readOnly
                type="tel"
                name="contact"
                id="contact"
                value={formData.contact}
                className="text-[#858C95] bg-[#EAEBF0] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                placeholder="Contact number"
              />
            </div>
            <div className="grid gap-y-2">
              <label
                htmlFor="email"
                className="text-[#323539] font-medium text-sm tracking-[-0.1px]"
              >
                Contact
              </label>
              <input
                readOnly
                type="email"
                name="email"
                id="email"
                value={formData.email}
                className="text-[#858C95] bg-[#EAEBF0] border-[#E5E5E7] rounded-[4px] border tracking-normal text-sm font-normal leading-6 px-4 py-3"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#2648EA] flex justify-center hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[170px]"
              disabled={isLoading || !pharmacyFound}
            >
              {isLoading ? "Loading..." : "Add Pharmacy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPharmacyModal;