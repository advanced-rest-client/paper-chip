import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '../../@polymer/polymer/lib/legacy/class.js';
import {FlattenedNodesObserver} from '../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import {IronControlState} from '../../@polymer/iron-behaviors/iron-control-state.js';
import {IronButtonState} from '../../@polymer/iron-behaviors/iron-button-state.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
/**
 * `paper-chip`
 *
 * A compact material design element that represent and input, attribute, or action.
 *
 * A chip contains a label and optionally an icon and remove icon.
 *
 * Remove icon is predefined. However icon can be any HTML element with
 * `slot="icon"` attribute. Per material design guidelines the icon is rounded.
 *
 * ## Example
 *
 * ```html
 * <paper-chip removable>
 *  <iron-icon icon="maps:directions-bike" slot="icon"></iron-icon>
 *  Biking
 * </paper-chip>
 * ```
 *
 * The "Bliking" is the label rendered next to the icon. The chip also renders
 * built-in remove icon. Clicking on the icon dispatches `chip-removed`
 * custom event only. It does not remove the chip from the document as the
 * application logic might use different ways of removing elements from dom
 * than web platform APIs.
 *
 * ## Styling
 *
 * `<paper-chip>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--paper-chip-background-color` | Chip background color | `rgba(35, 47, 52, 0.12)`
 * `--paper-chip-focused-background-color` | Background color when focused | `#D6D6D6`
 * `--paper-chip-active-background-color` | Background color when toggle is active | `#cdcdcd`
 * `--paper-chip-icon-color` | Color of the icon | `#666666`
 * `--paper-chip-label-color` | Color of the label | `#232F34`
 * `--paper-chip-label-focused-color` | Color of the when focused | ``
 * `--paper-chip-label-active-color` | Color of the when active | ``
 * `--paper-chip-icon-close-color` | Color of the close icon | `#dfdfdf`
 * `--paper-chip-icon-close-background-color` | Background color of the close icon | `#666666`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 */
class PaperChip extends mixinBehaviors(
  [IronControlState, IronButtonState], PolymerElement) {
  static get template() {
    return html`
    <style>
    :host {
      display: inline-block;
      outline: none;
      cursor: default;
      margin: 4px;
      box-sizing: border-box;
    }

    .container {
      border-radius: 16px;
      background-color: var(--paper-chip-background-color, rgba(35, 47, 52, 0.12));
      height: inherit;
      min-height: 32px;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);

      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-direction: row;
      -webkit-flex-direction: row;
      flex-direction: row;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }

    :host([focused]) .container {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
      background-color: var(--paper-chip-focused-background-color, #D6D6D6);
    }

    :host([active]) .container {
      background-color: var(--paper-chip-active-background-color, #cdcdcd);
    }

    :host([toggles]) {
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.54;
      pointer-events: none;
    }

    .icon ::slotted([slot=icon]) {
      border-radius: 50%;
      margin: 4px 0 4px 6px;
      color: var(--paper-chip-icon-color, #666666);
    }

    .label {
      display: inline-block;
      padding: 0px 8px;
      margin-left: 12px;
      margin-right: 12px;
      font-size: var(--arc-font-body2-font-size);
      font-weight: var(--arc-font-body2-font-weight);
      line-height: var(--arc-font-body2-line-height);
      color: var(--paper-chip-label-color, #232F34);
    }

    .label ::slotted([slot]) {
      font-size: var(--arc-font-body2-font-size);
      font-weight: var(--arc-font-body2-font-weight);
      line-height: var(--arc-font-body2-line-height);
      color: var(--paper-chip-label-color, #232F34);
    }

    :host([focused]) ::slotted([slot]),
    :host([focused]) .label {
      color: var(--paper-chip-label-focused-color);
    }

    :host([active]) ::slotted([slot]),
    :host([active]) .label {
      color: var(--paper-chip-label-active-color);
    }

    .with-icon .label {
      margin-left: 0;
    }

    .with-remove .label {
      margin-right: 0;
    }

    .close {
      width: 16px;
      height: 16px;
      background-color: var(--paper-chip-icon-close-background-color, #666666);
      color: var(--paper-chip-icon-close-color, #dfdfdf);
      border-radius: 50%;
      margin-right: 6px;
      cursor: pointer;
    }
    </style>
    <div class\$="container [[_computeContainerClass(_hasIconNode, removable)]]">
      <span class="icon"><slot name="icon"></slot></span>
      <span class="label"><slot></slot></span>
      <template is="dom-if" if="[[removable]]">
        <iron-icon class="close" icon="[[removeIcon]]" on-click="_removeHandler"></iron-icon>
      </template>
    </div>
`;
  }
  static get properties() {
    return {
      /**
       * If set the chip can be removed.
       * The element does not remove itself from the DOM. It rather dispatch
       * `chip-removed` custom event to inform parent element about the action.
       */
      removable: Boolean,
      /**
       * A name of the icon to render when `removable` property is set.
       * By default it referes to Polymer's default icons library, to the
       * `clear` icon. You must include this library into your document.
       * You can also use whatever other icons library.
       */
      removeIcon: {
        type: String,
        value: 'clear'
      },

      _hasIconNode: Boolean
    };
  }
  /**
   * @return {HTMLElement} Reference to the icon slot element.
   */
  get _iconSlot() {
    return this.shadowRoot.querySelector('slot[name="icon"]');
  }

  constructor() {
    super();
    this._keyDownHandler = this._keyDownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this._iconObserver = new FlattenedNodesObserver(
      this._iconSlot, () => this._detectHasIcon());
    this.addEventListener('keydown', this._keyDownHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._iconObserver.disconnect();
    this.removeEventListener('keydown', this._keyDownHandler);
  }
  /**
   * Handler for remove icon click event.
   * Cancels the event and calls `remove()`
   *
   * @param {ClickEvent} e
   */
  _removeHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    this.remove();
  }

  /**
   * Dispatches `chip-remove` custom event to inform application
   * that the user requested to remove the item.
   *
   * Note, this does not check if `removable` is set.
   */
  remove() {
    this.dispatchEvent(new CustomEvent('chip-removed', {
      composed: true,
      bubbles: true
    }));
  }
  /**
   * According to material design spec, when there's no icon the
   * left hand side padding should be 12dp. Slotted styling API does now
   * allow to detect when there's no contect so it has to be done using
   * node observer.
   */
  _detectHasIcon() {
    const nodes = this._iconSlot.assignedNodes()
      .filter((node) => node.nodeType === Node.ELEMENT_NODE);
    this._hasIconNode = !!nodes.length;
  }

  _computeContainerClass(hasIconNode, removable) {
    let klass = '';
    if (hasIconNode) {
      klass += 'with-icon';
    }
    if (removable) {
      if (klass) {
        klass += ' ';
      }
      klass += 'with-remove';
    }
    return klass;
  }
  /**
   * Handler for key down when element is focused.
   * Removes the item when delete key is pressed.
   * @param {KeyboardEvent} e
   */
  _keyDownHandler(e) {
    if (this.removable && (e.code === 'Backspace' || e.key === 'Backspace')) {
      this.remove();
    }
  }

  /**
   * Dispatched when the user clicked on "remove" button or when `remove()`
   * function is called.
   * The event bubbles through shadow DOM.
   *
   * @event chip-removed
   */
}
window.customElements.define('paper-chip', PaperChip);