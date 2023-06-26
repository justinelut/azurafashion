import PocketBase from 'pocketbase';

function createPocketBase(apiUrl, authCookie) {
    const pb = new PocketBase(apiUrl);
    pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`);
    pb.authStore.exportToCookie({ httpOnly: false });
    return pb;
}

export function getPocketBaseFromAuthCookie(authCookie) {
    if (authCookie) {
        const pb = createPocketBase('https://api.verixr.com', authCookie);
        return pb;
    }
    return null;
}

export async function refreshAuthStore(pb) {
    try {
        // Verify and refresh the loaded auth model (if any)
        if (pb.authStore.isValid) {
            await pb.collection('users').authRefresh();
        }
    } catch (error) {
        // Handle refresh error
        pb.authStore.clear();
        console.error('Auth refresh failed:', error);
    }
}

// Example usage:
const authCookie = {
    value: '...insert auth cookie value here...',
};

const pb = getPocketBaseFromAuthCookie(authCookie);
if (pb) {
    refreshAuthStore(pb);
}


export const user = pb.authStore.model