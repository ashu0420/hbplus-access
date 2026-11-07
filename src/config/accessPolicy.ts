const allowedDomain =
    process.env.EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN?.trim().toLowerCase() ?? '';

export function isAllowedEmail(email: string | null | undefined): boolean {
    if (!email || !allowedDomain) {
        return false;
    }

    return email.trim().toLowerCase().endsWith(`@${allowedDomain}`);
}

export { allowedDomain };