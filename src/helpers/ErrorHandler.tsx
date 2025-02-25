import axios from "axios";

export const handleError = (error: any) => {
  let errorMessages: string[] = [];

  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        errorMessages.push(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        errorMessages.push(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      errorMessages.push(err.data);
    } else if (err?.status == 401) {
      errorMessages.push("Inicie Sessão");
    } else if (err) {
      errorMessages.push(err?.data);
    }
  }

  return errorMessages;
};
