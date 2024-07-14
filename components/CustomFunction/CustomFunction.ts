// Function to format the date
export  function formatDateMonthToYear (isoString: string): string {
  const date = new Date(isoString);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}