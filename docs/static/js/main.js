// Form handler
(function () {
    var registerFormHandler = function () {
        var form = document.getElementById("contact-form");
        var messageActions = document.querySelector(".message-actions");
        var messageDisplay = document.getElementById("contact-form-message");
        var formStatus = document.getElementById("contact-form-status");
        var sendAnotherBtn = document.getElementById("send-another-btn");

        function handleSubmit(event) {
            event.preventDefault();
            formStatus.classList.remove("error");
            formStatus.innerHTML = "";
            var data = new FormData(event.target);
            form.getElementsByTagName("fieldset")[0].setAttribute("disabled", "true")
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success: show message and hide form
                    messageDisplay.innerHTML = "Thanks for your message! We'll get back to you soon.";
                    form.reset();
                    
                    // Trigger animations
                    form.classList.add("form-hidden");
                    setTimeout(() => {
                        messageActions.classList.add("visible");
                    }, 400);
                } else {
                    // Error: show error in form status
                    formStatus.classList.add("error");
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            formStatus.innerHTML = "Oops! There was a problem submitting your form"
                        }
                    })
                }
            }).catch(error => {
                formStatus.classList.add("error");
                formStatus.innerHTML = "Oops! There was a problem submitting your form"
            }).finally(() => {
                form.getElementsByTagName("fieldset")[0].removeAttribute("disabled")
            });
        }

        function handleSendAnother() {
            // Hide message and show form again
            messageActions.classList.remove("visible");
            setTimeout(() => {
                form.classList.remove("form-hidden");
                messageDisplay.classList.remove("error");
                messageDisplay.innerHTML = "";
                formStatus.classList.remove("error");
                formStatus.innerHTML = "";
                form.reset();
            }, 400);
        }

        form.addEventListener("submit", handleSubmit);
        sendAnotherBtn.addEventListener("click", handleSendAnother);
    }

    addEventListener("DOMContentLoaded", registerFormHandler);
})();

// Image carousels
(function () {
    function initImageCarousel(carousel) {
        const images = carousel.querySelectorAll('.carousel-image');
        let current = 0;
        const int = setInterval(() => {
            images[current].style.opacity = 0;
            current = (current + 1) % images.length;
            images[current].style.opacity = 1;
        }, 3500); // Change image every 3.5 seconds
    }

    function initImageCarousels() {
        document.querySelectorAll('.carousel').forEach(initImageCarousel);
    }

    addEventListener("DOMContentLoaded", initImageCarousels);
})()