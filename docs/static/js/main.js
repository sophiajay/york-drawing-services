// Form handler
(function () {
    var registerFormHandler = function () {
        var form = document.getElementById("contact-form");
        function handleSubmit(event) {
            event.preventDefault();
            var status = document.getElementById("contact-form-status");
            status.classList.remove("success", "error");
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
                    status.innerHTML = "Thanks for your message! We'll get back to you soon.";
                    status.classList.add("success");
                    form.reset()
                } else {
                    status.classList.add("error");
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form"
                        }
                    })
                }
            }).catch(error => {
                status.classList.add("error");
                status.innerHTML = "Oops! There was a problem submitting your form"
            }).finally(() => {
                form.getElementsByTagName("fieldset")[0].setAttribute("disabled", "false")
            });
        }
        form.addEventListener("submit", handleSubmit)
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