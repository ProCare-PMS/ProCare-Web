export const requestsTransfers = [
  {
    transfer_id: "58547",
    requested_by: "Erwin Smith",
    date: "12/09/2019",
    time: "5:23PM",
    pharmacy_id: "P#8Y83",
    pharmacy_name: "Pharmaaaa",
    location: "East Legon",
    items: [
      {
        name: "Paracetamol",
        quantity: 120,
        price: "1230",
      },
      {
        name: "Paracetamol",
        quantity: 120,
        price: "1230",
      },
      {
        name: "Paracetamol",
        quantity: 120,
        price: "1230",
      },
    ],
  },
];

export type RequestsTransfers = (typeof requestsTransfers)[number];
