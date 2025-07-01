class FrogAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const response = await fetch('data.jason');
    const { sections } = await response.json();
    this.render(sections);
  }

  render(sections) {
    this.shadowRoot.innerHTML = `
      <div class="accordion">
        ${sections.map((section, idx) => `
          <details>
            <summary id="accordion${idx + 1}">${section.title.value}</summary>
            <div class="panel">
              <p>${section.panel.value}</p>
              <img 
                src="images/${section.panel.image.src}" 
                alt="${section.panel.image.title}" 
                title="${section.panel.image.title}" 
              />
            </div>
          </details>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('frog-accordion', FrogAccordion);