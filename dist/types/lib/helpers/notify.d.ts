declare type Notification = {
    type: 'error' | 'success' | 'info' | 'warn';
    text: string;
};
/**
 * Notifies the user and also us, the devs, of anything!
 *
 * @kind Store action wrapper
 * fallsback to console
 *
 * @param {Notification} notification
 */
declare function notify(notification: Notification): void;
export default notify;
