const projectForm = document.querySelector(".project-form");
const formStatus = document.querySelector("#form-status");

if (projectForm && formStatus) {
  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!projectForm.reportValidity()) {
      formStatus.textContent = "Please check the required fields.";
      return;
    }

    const submitButton = projectForm.querySelector(".form-submit");
    const formData = new FormData(projectForm);

    submitButton.disabled = true;
    formStatus.textContent = "Sending your project brief…";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) {
        throw new Error("The form submission was not accepted.");
      }

      projectForm.reset();
      formStatus.textContent =
  "Your project brief was submitted. For a reply, please contact me using the WhatsApp or email links on this page.";
    } catch (error) {
      formStatus.textContent =
        "The form could not be sent. Your entries are still here; please try again.";
    } finally {
      submitButton.disabled = false;
    }
  });
}