export const historyTransfers = [
    {
        id: "343434",
      transfer_id: "58547",
      reviewed_by: "Erwin Smith",
      date: "12/09/2019",
      contact: "0202883843",
      time: "5:23PM",
      pharmacy_id: "P#8Y83",
      pharmacy_name: "Pharmaaaa",
      location: "East Legon",
      items: [
        {
          name: "Paracetamol",
          quantity: 120,
          price: "1230",
          status: "Accepted",
        },
        {
          name: "Paracetamol",
          quantity: 120,
          price: "1230",
          status: "Pending",
        },
        {
          name: "Paracetamol",
          quantity: 120,
          price: "1230",
          status: "Rejected",
          reason: ""
        },
      ],
    },
  ];
  
  export type HistoryTransfers = (typeof historyTransfers)[number];
  