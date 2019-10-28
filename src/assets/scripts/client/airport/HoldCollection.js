import _isObject from 'lodash/isObject';
import HoldModel from './HoldModel';
import BaseCollection from '../base/BaseCollection';

/**
 * Collection of `HoldModel`s
 *
 * Provides methods to create `HoldModel`s, used by `AirportModel`
 * and `WaypointModel` for configuring hold
 *
 * @class HoldCollection
 * @extends BaseCollection
 */
export default class HoldCollection extends BaseCollection {
    /**
     * @constructor
     * @param holdJson {array}
     */
    constructor(holdJson) {
        super();

        // holdsJson is permitted to be null/undefined/empty, but if valid must be an object
        if (holdJson != null && !_isObject(holdJson)) {
            throw new TypeError(
                `Invalid holdJson parameter passed to HoldCollection. Expected an object but found ${typeof holdJson}`
            );
        }

        /**
         * @inherited
         * @memberof BaseCollection
         * @property _items
         * @type {array<HoldModel>}
         * @default []
         */

        /**
         * @inherited
         * @memberof BaseCollection
         * @property length
         * @type {number}
         * @default #_items.length
         */

        this._init(holdJson);
    }

    /**
     * Public fascade for `#_items`
     *
     * @for HoldCollection
     * @property holds
     * @return {array<HoldModel>}
     */
    get holds() {
        return this._items;
    }

    // ------------------------------ LIFECYCLE ------------------------------

    /**
     * Initialize the instance
     *
     * @for HoldCollection
     * @method _init
     * @param holdJson {object}
     */
    _init(holdJson) {
        if (!holdJson) {
            return;
        }

        this._items = Object.keys(holdJson).map((fixName) => {
            return new HoldModel(fixName, holdJson[fixName]);
        });
    }

    /**
     * @for HoldCollection
     * @method reset
     */
    reset() {
        this.holds.forEach((item) => item.reset());

        this._items = [];
    }

    // ------------------------------ PUBLIC ------------------------------

    /**
     * Find a holdParameters by `fixName` if it exists within the collection
     *
     * @for HoldCollection
     * @method findHoldParametersByFix
     * @param fixName {string}
     * @return {object|null}
     */
    findHoldParametersByFix(fixName) {
        if (!fixName) {
            return null;
        }

        const model = this._items.find((hold) => hold.fixName === fixName.toUpperCase());

        return model ? model.holdParameters : null;
    }
}
