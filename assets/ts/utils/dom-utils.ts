export function lockBody(): boolean | void {
    if (!process.client) {
        return false;
    }

    const paddingWidth = window.innerWidth - document.body.offsetWidth;

    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${paddingWidth}px`;
}

export function unlockBody(): boolean | void {
    if (!process.client) {
        return false;
    }

    document.documentElement.style.height = '';
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}
