export type UserStatus =
| "ACTIVE"
| "INACTIVE"
| "SUSPENDED"
| "PENDING";

export interface UserProfile {
id: string;
email: string;
firstName: string;
lastName: string;
phone: string | null;
status: UserStatus;
emailVerifiedAt: Date | null;
lastLoginAt: Date | null;
createdAt: Date;
updatedAt: Date;
}

export interface UpdateUserProfileInput {
firstName?: string;
lastName?: string;
phone?: string | null;
}
