import sgMail from "@sendgrid/mail";
sgMail.setApiKey("");

export function sendMail(msg) {
  sgMail.send(msg).then((res) => {});
}
