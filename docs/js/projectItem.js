const template = document.createElement('template');
template.innerHTML = `
<style>
*,::after,::before {
    margin: 0px;
    padding: 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.projects__title {
    margin-bottom: .5rem;
}

.projects__item {
    margin-bottom: 2rem;
}

.item__link {
    margin-top: -1.5rem;
    margin-bottom: 1rem;
}

.item__link_title {
    font-size: 4rem;
    font-weight: bold;
    text-decoration: none;
    color: #FFFFFF;
    -webkit-text-stroke: 1px #313131;
}

.item__link_title:hover {
    font-weight: 700;
    color: #313131;
    -webkit-text-stroke-width: 0;
    transition: .4s;
}

.item__link_title::after {
    content: '';
    display: block;
    background-color: #313131;
    height: 1px;
    width: 100%;
}

.item__container {
    display: flex;
    flex-direction: row;
}

.item__information {
    width: 45%;
    min-width: 450px;
    padding: .3rem 1rem;
}

.item__visual {
    width: 55%;
}

.information__container{
    display: flex;
    flex-direction: column;
    height: 60%;
}

.visual__container {
    display: flex;
    /*justify-content: flex-end;*/
}

.projects__paragraph {
    font-size: 24px;
    line-height: 32px;
    font-weight: 300;
    margin-bottom: 1rem;
}

.projects__img {
    width: 100%;
    height: auto;
    border-radius: .3rem;
}

.link_gray {
    color: #313131;
}

@media only screen and (max-width: 1024px) {
    .item__container {
        flex-wrap: wrap;
    }

    .item__information,
    .item__visual {
        width: 100%;
    }

    .visual__container {
        width: 70%;
        margin: 0 auto;
    }
}

@media only screen and (max-width: 769px) {
    .item__link {
        margin-top: 0;
    }
    .item__link_title {
        font-size: 2rem;
    }
    
    .visual__container {
        width: 90%;
    }
    
}

@media only screen and (max-width: 481px) {
    .title {
        font-size: 1.5rem;
    }
    .item__information {
        min-width: 200px;
        padding: 0;
    }
}
</style>

<article class="projects__item item">
    <div class="item__link">
        <a id="project-link-1" class="item__link_title" target="_blank" rel="noopener"></a>
    </div>
    <div class="item__container">
        <div class="item__information">
            <div class="information__container">
                <h3 class="projects__paragraph"></h3>
                <p class="projects__paragraph">Стэк: <span></span></p>
                <p class="projects__paragraph">
                    <a id="github-link" class="link_gray" target="_blank" rel="noopener">Github проекта</a>
                </p>
            </div>
        </div>
    
    <div class="item__visual">
        <div class="visual__container">
            <a id="project-link-2" target="_blank" rel="noopener">
                <picture>
                    <source id='source-webp-mobile' type="image/webp">
                    <source id="img-mobile">
                    <source id="source-webp" type="image/webp">
                    <img id="img" class="projects__img" height="398" width="675">
                </picture>
            </a>
        </div>
    </div>
    </div>
</article>
`;

class ProjectItem extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('name')
        this.shadowRoot.querySelector('span').innerHTML = this.getAttribute('stack')
        this.shadowRoot.getElementById('github-link').href = this.getAttribute('github-link')
        this.shadowRoot.getElementById('project-link-1').innerHTML = this.getAttribute('project-name')
        this.shadowRoot.getElementById('project-link-1').href = this.getAttribute('project-link')
        this.shadowRoot.getElementById('project-link-2').href = this.getAttribute('project-link')

        const img = this.shadowRoot.getElementById('img')
        img.alt = this.getAttribute('project-name')
        img.src = this.getAttribute('jpg-or-png@1x')
        img.srcset = this.getAttribute('jpg-or-png@2x')

        const sourceWebp = this.shadowRoot.getElementById('source-webp')
        sourceWebp.srcset = this.getAttribute('webp')

        const sourceJpgOrPngMobile = this.shadowRoot.getElementById('img-mobile')
        sourceJpgOrPngMobile.srcset = this.getAttribute('jpg-or-png-mobile')
        sourceJpgOrPngMobile.media = this.getAttribute('mobile-img-media')

        const sourceWebpMobile = this.shadowRoot.getElementById('source-webp-mobile')
        sourceWebpMobile.srcset = this.getAttribute('webp-mobile')
        sourceWebpMobile.media = this.getAttribute('mobile-img-media')
    }
}

window.customElements.define('project-item', ProjectItem)
