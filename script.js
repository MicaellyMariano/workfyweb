document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("backToTop")

  
  function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show")
    } else {
      backToTopButton.classList.remove("show")
    }
  }


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

 
  window.addEventListener("scroll", toggleBackToTopButton)
  backToTopButton.addEventListener("click", scrollToTop)

  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }, observerOptions)

 
  document
    .querySelectorAll(".feature-card, .about-card, .team-member, .screenshot-card, .tech-card")
    .forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "all 0.6s ease"
      observer.observe(card)
    })


  function throttle(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }


  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })


  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    if (img.complete) {
      img.style.opacity = "1"
    } else {
      img.style.opacity = "0"
      img.style.transition = "opacity 0.5s ease"
    }
  })

  
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", throttle(updateActiveNavLink, 100))


  const style = document.createElement("style")
  style.textContent = `
        .navbar-nav .nav-link.active {
            color: var(--primary-green) !important;
        }
    `
  document.head.appendChild(style)


  let ticking = false

  function updateAnimations() {
    
    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateAnimations)
      ticking = true
    }
  }

  
  window.addEventListener("scroll", requestTick)
})


function safeQuerySelector(selector, callback) {
  const element = document.querySelector(selector)
  if (element && typeof callback === "function") {
    callback(element)
  }
}


const lazyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
        lazyObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".feature-card, .screenshot-card, .team-member, .tech-card, .about-card").forEach((el) => {
    lazyObserver.observe(el)
  })
})
