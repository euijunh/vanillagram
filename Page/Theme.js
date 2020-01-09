import common from '../Common/common.js';
import Card from '../Component/Card.js';
import ClickMore from '../Prototype/ClickMore.js';
import ScrollMore from '../Prototype/ScrollMore.js';
import engine from '../Common/engine.js';

class Theme extends ClickMore {
    constructor(param = {}) {
        super();
        this.$parent = param.parent;
        this.$el;
        this.render();
        this.$more = this.$el.querySelector('#more');
        this.$click = this.$el.querySelector('#click');
        this.$scroll = this.$el.querySelector('#scroll');
        this.url = 'https://my-json-server.typicode.com/it-crafts/mockapi/feed/';
        this.event = {
            initScroll: undefined,
        }
        this.create();
        this.items = new Card({ parent: this.$el.querySelector('#items'), colsCnt: 3 });
    }

    async create() {
        await super.create();
        if(this.hasNext) {
            this.addEvent();
        } else {
            this.$more.style.display = 'none';
        }
    }

    renderMore(data) {
        this.items.render(data);
    }

    processData(list) {
        list.forEach(data => {
            data.img = common.imgPath + data.img;
            const min = Math.ceil(140);
            const max = Math.floor(170);
            data.height = Math.floor(Math.random() * (max - min + 1)) + min + '%';
        });
    }

    initScroll(e) {
        this.$more.style.display = 'none';
        this.removeEvent();

        if(Object.setPrototypeOf && Object.getPrototypeOf) {
            Object.setPrototypeOf(Object.getPrototypeOf(this), ScrollMore.prototype);
        } else {
            this.__proto__.__proto__ = ScrollMore.prototype;
        }

        super.addEvent();
        this.scroll();
    }

    finalScroll() {
        if(Object.setPrototypeOf && Object.getPrototypeOf) {
            Object.setPrototypeOf(Object.getPrototypeOf(this), ClickMore.prototype);
        } else {
            this.__proto__.__proto__ = ClickMore.prototype;
        }
    }

    addEvent() {
        super.addEvent();
        this.event.initScroll = this.initScroll.bind(this);
        this.$scroll.addEventListener('click', this.event.initScroll);
    }

    removeEvent() {
        super.removeEvent();
        this.$scroll.removeEventListener('click', this.event.initScroll);
    }

    render() {
        const template = `
            <div class="v9tJq VfzDr">
                <div class=" _2z6nI">
                    <div class="Gx7Kn">
                        <div id="items" style="flex-direction: column; padding-bottom: 0px; padding-top: 0px;">
                        </div>
                        <div id="more" class=" Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl " style="margin-right: 8px">
                            <button id="click" class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">더보기</button>
                            <button id="scroll" class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">전체보기</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const { fragment, elements } = engine(template, [null]);
        this.$parent.appendChild(fragment);
        this.$el = elements[0];
    }

    destroy() {
        this.items.destroy();
        this.$parent.removeChild(this.$el);
        this.removeEvent();
        this.finalScroll();
    }
}

export default Theme;