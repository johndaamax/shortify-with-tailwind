/** Wrapper function to handle copying to clipboard on non-https agents (mobile devices as well)
 * @param {String} textToCopy the string to copy
*/

export const copyToClipboard = (textToCopy: string) => {
    // navigator clipboard API needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard API
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area helper element
        let textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        // set the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-99999px';
        textArea.style.top = '-99999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res(``) : rej();
            textArea.remove();
        });
    }
}