import axios from "axios";

export const sendFcmMessage = (title, body, token) => {
  const data = {
    notification: {
      title: title,
      body: body,
      click_action: "http://localhost:8080/",
      icon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYWXioShgsa3_D3Oxv7xIsB66yFp6a7XNLA&usqp=CAU",
    },
    data: {
      title: title,
      body: body,
    },
    to: token,
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization:
        "key=AAAA1zhJ9CY:APA91bG9PqlaqTdvwDuq163CVooPrabY3QBVmcQrA1zK5p3VBjR6_l4L4nWphvvEWXZnM1FtiV7ZzRjA_AHH1E8WgABfkqcaiOnAV0nFmGY7SRca9_-X4pHeMorCQpB6q5nc5t3x3dpx",
    },
    data: JSON.stringify(data),
    url: "https://fcm.googleapis.com/fcm/send",
  };
  axios(options)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};
