// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Active navigation link
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Portfolio filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filterValue === "all") {
          item.classList.remove("hidden")
        } else {
          const categories = item.getAttribute("data-category").split(" ")
          if (categories.includes(filterValue)) {
            item.classList.remove("hidden")
          } else {
            item.classList.add("hidden")
          }
        }
      })
    })
  })

  // Skill bars animation - Fixed version
  const skillBars = document.querySelectorAll(".skill-progress")
  const skillsSection = document.getElementById("skills")

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      // Add a small delay to ensure the animation is visible
      setTimeout(() => {
        bar.style.width = width + "%"
      }, 100)
    })
  }

  // Intersection Observer for skill bars with better options
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars()
          skillsObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  if (skillsSection) {
    skillsObserver.observe(skillsSection)
  }

  // Fallback: Animate skill bars on page load after a delay
  window.addEventListener("load", () => {
    setTimeout(() => {
      // Check if skill bars are visible on screen
      const skillsSectionRect = skillsSection?.getBoundingClientRect()
      if (skillsSectionRect && skillsSectionRect.top < window.innerHeight) {
        animateSkillBars()
      }
    }, 1000)
  })

  // Manual trigger for testing - you can remove this later
  document.addEventListener("keydown", (e) => {
    if (e.key === "s" || e.key === "S") {
      animateSkillBars()
    }
  })

  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load

  // Add animation classes to elements
  const addAnimationClasses = () => {
    // Timeline items
    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item, index) => {
      if (index % 2 === 0) {
        item.classList.add("slide-in-left")
      } else {
        item.classList.add("slide-in-right")
      }
    })

    // Portfolio items
    const portfolioItemsAnim = document.querySelectorAll(".portfolio-item")
    portfolioItemsAnim.forEach((item) => {
      item.classList.add("fade-in")
    })

    // Quality cards
    const qualityCards = document.querySelectorAll(".quality-card")
    qualityCards.forEach((card) => {
      card.classList.add("fade-in")
    })

    // Info cards
    const infoCards = document.querySelectorAll(".info-card")
    infoCards.forEach((card) => {
      card.classList.add("fade-in")
    })

    // Experience items
    const experienceItems = document.querySelectorAll(".experience-item")
    experienceItems.forEach((item) => {
      item.classList.add("slide-in-left")
    })
  }

  addAnimationClasses()
})

// Modal functionality
const modalOverlay = document.getElementById("modal-overlay")
const modalBody = document.getElementById("modal-body")

const projectData = {
  project1: {
    title: "UTeM Student Management System",
    description:
      "A comprehensive web-based student management system developed as my major project. This system handles student registration, course management, grade tracking, and administrative functions for academic institutions.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    features: [
      "Student registration and profile management",
      "Course enrollment and scheduling system",
      "Grade management and transcript generation",
      "Faculty dashboard for course management",
      "Administrative panel for system oversight",
      "Responsive design for mobile and desktop",
      "Secure user authentication and authorization",
      "Database backup and recovery system",
    ],
    challenges:
      "The main challenges included designing a scalable database schema to handle complex relationships between students, courses, and faculty, implementing secure user authentication with different access levels, and ensuring data integrity across all transactions.",
    outcome:
      "Successfully developed a fully functional student management system that can handle 500+ students and 50+ courses. The project received excellent feedback from supervisors and demonstrated strong full-stack development skills. Currently being considered for implementation in a local educational institution.",
  },
  project2: {
    title: "Server Migration & Relocation Project",
    description:
      "Led a critical server migration and relocation project for major tech companies including Alibaba and ByteDance during my internship. Responsible for planning, executing, and ensuring zero data loss during the transition.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Windows Server", "Linux", "VMware", "Network Configuration"],
    features: [
      "Complete server inventory and assessment",
      "Migration planning and timeline development",
      "Data backup and verification procedures",
      "Physical server relocation coordination",
      "Network reconfiguration and testing",
      "Service restoration and validation",
      "Documentation of new infrastructure",
      "Client training on new setup",
    ],
    challenges:
      "The biggest challenge was ensuring zero downtime during the migration while maintaining data integrity. Had to coordinate with multiple departments, manage hardware compatibility issues, and troubleshoot network connectivity problems during the relocation.",
    outcome:
      "Successfully completed server migrations for 200+ servers with zero data loss and minimal downtime. The new setups improved system performance significantly and enhanced security protocols. Received excellent feedback from clients and supervisors.",
  },
  project3: {
    title: "Server Installation & Configuration",
    description:
      "Complete server installation and configuration project for various clients during my internship. Involved hardware setup, operating system installation, and security configuration.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Server Hardware", "Windows Server", "Linux", "Network Setup"],
    features: [
      "Physical server hardware installation",
      "Operating system deployment and configuration",
      "Network services configuration (DNS, DHCP)",
      "Security policies and firewall configuration",
      "Backup and disaster recovery setup",
      "Performance monitoring and optimization",
      "Cable management and rack organization",
      "Client training and documentation",
    ],
    challenges:
      "Key challenges included hardware compatibility verification, proper cable management in server racks, configuring complex network settings, and ensuring all security protocols met client standards.",
    outcome:
      "Successfully installed and configured 200+ servers for various clients. The installations improved system reliability and provided better resource allocation. All servers passed security audits and performance benchmarks.",
  },
  project4: {
    title: "Digital Portfolio (HCI Project)",
    description:
      "This portfolio website created as part of BITM 2313 Human Computer Interaction course, demonstrating HCI principles and modern web development practices.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "HCI Principles"],
    features: [
      "Responsive design for all devices",
      "Smooth scrolling navigation",
      "Interactive portfolio filtering",
      "Animated skill progress bars",
      "Modal project details",
      "Accessibility considerations",
      "Modern UI/UX design principles",
      "Cross-browser compatibility",
    ],
    challenges:
      "Applying HCI principles learned in class to create an intuitive and accessible user interface while showcasing technical skills. Balancing visual appeal with usability and ensuring the site works well across different devices and browsers.",
    outcome:
      "Successfully created a professional portfolio that demonstrates understanding of user-centered design, information architecture, and modern web development practices. The project showcases both technical skills and design thinking abilities.",
  },
}

function openModal(projectId) {
  const project = projectData[projectId]
  if (!project) return

  modalBody.innerHTML = `
        <div class="modal-project">
            <div class="modal-info">
                <h2>${project.title}</h2>
                <p class="modal-description">${project.description}</p>
                
                <div class="modal-section">
                    <h3>Technologies Used</h3>
                    <div class="modal-tags">
                        ${project.technologies.map((tech) => `<span class="tag">${tech}</span>`).join("")}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul class="modal-features">
                        ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>Challenges</h3>
                    <p>${project.challenges}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Outcome</h3>
                    <p>${project.outcome}</p>
                </div>
            </div>
        </div>
    `

  modalOverlay.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeModal() {
  modalOverlay.style.display = "none"
  document.body.style.overflow = "auto"
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})

// Add CSS for modal styling
const modalStyles = `
<style>
.modal-project {
    padding: 2rem;
}

.modal-info h2 {
    font-size: 2rem;
    color: #f1f5f9;
    margin-bottom: 1rem;
}

.modal-description {
    font-size: 1.1rem;
    color: #94a3b8;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.modal-section {
    margin-bottom: 2rem;
}

.modal-section h3 {
    font-size: 1.3rem;
    color: #f1f5f9;
    margin-bottom: 1rem;
}

.modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.modal-features {
    list-style: none;
    padding: 0;
}

.modal-features li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #475569;
    color: #e2e8f0;
}

.modal-features li:before {
    content: '✓';
    color: #22c55e;
    font-weight: bold;
    margin-right: 0.5rem;
}

.modal-section p {
    color: #94a3b8;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .modal-content {
        margin: 1rem;
        max-height: 95vh;
    }
    
    .modal-project {
        padding: 1rem;
    }
    
    .modal-info h2 {
        font-size: 1.5rem;
    }
}
</style>
`

document.head.insertAdjacentHTML("beforeend", modalStyles)

// Contact form functionality (if you want to add a contact form later)
function handleContactForm(event) {
  event.preventDefault()
  // Add your contact form handling logic here
  alert("Thank you for your message! I will get back to you soon.")
}

// Lazy loading for images
const images = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => imageObserver.observe(img))

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Your scroll handling code here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
