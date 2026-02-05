export const roles = {
  owner: "owner",
  companyAdmin: "company_admin",
  professional: "professional",
} as const;

export type Role = (typeof roles)[keyof typeof roles];

export const appointmentStatus = {
  pending: "pending",
  confirmed: "confirmed",
  canceled: "canceled",
} as const;

export type AppointmentStatus =
  (typeof appointmentStatus)[keyof typeof appointmentStatus];
