const projectList = document.querySelector("#project-list");
const emptyMessage = document.querySelector("#projects-empty");
const projects = window.portfolioProjects;

if (projectList && emptyMessage && Array.isArray(projects) && projects.length > 0) {
  const validProjects = projects.filter((project) => {
    return (
      project &&
      typeof project.title === "string" &&
      typeof project.description === "string" &&
      typeof project.image === "string" &&
      typeof project.imageAlt === "string" &&
      typeof project.caseStudyUrl === "string" &&
      Array.isArray(project.technologies)
    );
  });

  if (validProjects.length > 0) {
    emptyMessage.hidden = true;

    validProjects.forEach((project) => {
      const article = document.createElement("article");
      article.className = "project-card";

      const link = document.createElement("a");
      link.className = "project-card-link";
      link.href = project.caseStudyUrl;

      const image = document.createElement("img");
      image.className = "project-image";
      image.src = project.image;
      image.alt = project.imageAlt;
      image.width = 1200;
      image.height = 800;
      image.loading = "lazy";
      image.decoding = "async";

      const details = document.createElement("div");
      details.className = "project-details";

      const title = document.createElement("h2");
      title.textContent = project.title;

      const description = document.createElement("p");
      description.className = "project-description";
      description.textContent = project.description;

      const technologyList = document.createElement("ul");
      technologyList.className = "technology-list";
      technologyList.setAttribute("aria-label", "Technologies used");

      project.technologies.forEach((technology) => {
        if (typeof technology !== "string") {
          return;
        }

        const item = document.createElement("li");
        item.textContent = technology;
        technologyList.append(item);
      });

      details.append(title, description, technologyList);
      link.append(image, details);
      article.append(link);
      projectList.append(article);
    });
  }
}