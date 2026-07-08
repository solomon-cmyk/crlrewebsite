export const OWNER_SPLIT = 0.6;
export const FEE = 0.1;
export const RESERVE = 0.05;
export const COMP_NIGHTS = 5;
export const TAKE = (1 - FEE) * OWNER_SPLIT - RESERVE; // 0.49

export interface ProceedsResult {
  rentable: number;
  nights: number;
  gross: number;
  fee: number;
  net: number;
  hotelShare: number;
  ownerShare: number;
  reserve: number;
  proceeds: number;
}

export function proceedsAt(
  adr: number,
  occupancy: number,
  personalNights: number
): ProceedsResult {
  const rentable = Math.max(0, 365 - personalNights - COMP_NIGHTS);
  const nights = rentable * occupancy;
  const gross = adr * nights;

  return {
    rentable,
    nights,
    gross,
    fee: gross * FEE,
    net: gross * (1 - FEE),
    hotelShare: gross * (1 - FEE) * (1 - OWNER_SPLIT),
    ownerShare: gross * (1 - FEE) * OWNER_SPLIT,
    reserve: gross * RESERVE,
    proceeds: gross * TAKE,
  };
}

export function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function fmtK(n: number): string {
  return n >= 1000 ? "$" + (n / 1000).toFixed(1) + "k" : fmt(n);
}

export function paintRange(el: HTMLInputElement): void {
  const pct = ((+el.value - +el.min) / (+el.max - +el.min)) * 100;
  el.style.setProperty("--fill", pct + "%");
}
