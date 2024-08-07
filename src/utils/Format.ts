export const priceFormat = (price: number) => {
  const len = localStorage.getItem("i18nextLng");
  const locale = len === "en" ? "en-US" : "ar-kw";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "KWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const westernToKuwaitiDigits: { [key: string]: string } = {
  "0": "٠",
  "1": "١",
  "2": "٢",
  "3": "٣",
  "4": "٤",
  "5": "٥",
  "6": "٦",
  "7": "٧",
  "8": "٨",
  "9": "٩",
};
const westernToEnglishDigits: { [key: string]: string } = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

export const NumberFormat = (phoneNumber: string): string => {
  const len = localStorage.getItem("i18nextLng");
  return phoneNumber
    .split("")
    .map((digit) =>
      len === "en"
        ? westernToEnglishDigits[digit] || digit
        : westernToKuwaitiDigits[digit] || digit
    )
    .join("");
};

export const BankNumberFormat = (Number: string): string => {
  const len = localStorage.getItem("i18nextLng");
  if (!Number) {
    return "";
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maskedNumber: any = Number.slice(-4).padStart(Number.length, "*");
  const formattedNumber = maskedNumber.match(/.{1,4}/g).join(" ");

  return formattedNumber
    .split("")
    .map((digit: string | number) =>
      len === "en"
        ? westernToEnglishDigits[digit] || digit
        : westernToKuwaitiDigits[digit] || digit
    )
    .join("");
};

// export const priceFormat = (price: number) => {
//   const len = localStorage.getItem("i18nextLng");
//   return new Intl.NumberFormat(`${len === "en" ? "en-US" : "ar-kw"}`, {
//     style: "currency",
//     currency: "KWD",
//   }).format(price);
// };
