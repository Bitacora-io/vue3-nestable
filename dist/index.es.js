var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a2, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, Fragment, renderList, createBlock, withCtx, normalizeProps, guardReactiveProps, createCommentVNode, normalizeStyle, createVNode, createTextVNode } from "vue";
const store = {};
var groupsObserver = {
  methods: {
    registerNestable(nestable) {
      const storeGroup = this._getByGroup(nestable.group);
      storeGroup.onDragStartListeners.push(nestable.onDragStart);
      storeGroup.onMouseEnterListeners.push(nestable.onMouseEnter);
      storeGroup.onMouseMoveListeners.push(nestable.onMouseMove);
    },
    notifyDragStart(group, event, item) {
      const storeGroup = this._getByGroup(group);
      for (const listener of storeGroup.onDragStartListeners) {
        listener(event, item);
      }
    },
    notifyMouseEnter(group, event, eventList, item) {
      const storeGroup = this._getByGroup(group);
      for (const listener of storeGroup.onMouseEnterListeners) {
        listener(event, eventList, item);
      }
    },
    notifyMouseMove(group, event) {
      const storeGroup = this._getByGroup(group);
      for (const listener of storeGroup.onMouseMoveListeners) {
        listener(event);
      }
    },
    _getByGroup(group) {
      if (store[group]) {
        return store[group];
      }
      store[group] = {
        onDragStartListeners: [],
        onMouseEnterListeners: [],
        onMouseMoveListeners: [],
        onDragStart: [],
        dragItem: null
      };
      return store[group];
    }
  }
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  name: "NestableItem",
  mixins: [groupsObserver],
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({})
    },
    index: {
      type: Number,
      required: false,
      default: null
    },
    isChild: {
      type: Boolean,
      required: false,
      default: false
    },
    isCopy: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  inject: ["listId", "group", "keyProp"],
  data() {
    return {
      breakPoint: null,
      moveDown: false
    };
  },
  computed: {
    isDragging() {
      const dragItem = this.options.dragItem;
      return !this.isCopy && dragItem && dragItem[this.options.keyProp] === this.item[this.options.keyProp];
    },
    hasChildren() {
      return this.item[this.options.childrenProp] && this.item[this.options.childrenProp].length > 0;
    },
    hasHandle() {
      return !!this.$scopedSlots.handler;
    },
    normalizedClassProp() {
      const classProp = this.item[this.options.classProp];
      if (!classProp)
        return [];
      if (Array.isArray(classProp)) {
        return classProp;
      } else if (typeof a === "object") {
        return [classProp];
      } else {
        return [classProp];
      }
    },
    itemClasses() {
      const isDragging = this.isDragging ? ["is-dragging"] : [];
      let classes = [
        `nestable-item${this.isCopy ? "-copy" : ""}`,
        `nestable-item${this.isCopy ? "-copy" : ""}-${this.item[this.options.keyProp]}`,
        ...isDragging,
        ...this.normalizedClassProp
      ];
      if (this.options.expandable) {
        classes.push(this.item.expanded ? "is-active" : null);
      }
      return classes;
    }
  },
  methods: {
    onMouseEnter(event) {
      if (!this.options.dragItem)
        return;
      if (!event.movementY) {
        return this.sendNotification(event);
      }
      this.moveDown = event.movementY > 0;
      this.breakPoint = event.target.getBoundingClientRect().height / 2;
    },
    onMouseLeave() {
      this.breakPoint = null;
    },
    onMouseMove(event) {
      if (!this.breakPoint)
        return;
      const delta = event.offsetY - this.breakPoint;
      if (this.moveDown && delta < this.breakPoint / 4)
        return;
      if (!this.moveDown && delta > -this.breakPoint / 4)
        return;
      this.sendNotification(event);
    },
    sendNotification(event) {
      this.breakPoint = null;
      const item = this.item || this.$parent.item;
      this.notifyMouseEnter(this.group, event, this.listId, item);
    }
  }
};
const _hoisted_1$1 = {
  key: 0,
  class: "nestable-list"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NestableItem = resolveComponent("NestableItem", true);
  return openBlock(), createElementBlock("li", {
    class: normalizeClass($options.itemClasses)
  }, [
    createElementVNode("div", {
      class: "nestable-item-content",
      onMouseenter: _cache[0] || (_cache[0] = (...args) => $options.onMouseEnter && $options.onMouseEnter(...args)),
      onMouseleave: _cache[1] || (_cache[1] = (...args) => $options.onMouseLeave && $options.onMouseLeave(...args)),
      onMousemove: _cache[2] || (_cache[2] = (...args) => $options.onMouseMove && $options.onMouseMove(...args))
    }, [
      renderSlot(_ctx.$slots, "default", {
        index: $props.index,
        item: $props.item,
        isChild: $props.isChild
      })
    ], 32),
    $options.hasChildren ? (openBlock(), createElementBlock("ol", _hoisted_1$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.item[$props.options.childrenProp], (child, childIndex) => {
        return openBlock(), createBlock(_component_NestableItem, {
          key: child[$options.keyProp],
          item: child,
          index: childIndex,
          options: $props.options,
          "is-copy": $props.isCopy,
          "is-child": ""
        }, {
          default: withCtx((slotData) => [
            renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotData)))
          ]),
          _: 2
        }, 1032, ["item", "index", "options", "is-copy"]);
      }), 128))
    ])) : createCommentVNode("", true)
  ], 2);
}
var NestableItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  name: "Placeholder",
  mixins: [groupsObserver],
  props: {
    index: {
      type: Number,
      required: false,
      default: null
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  inject: ["listId", "group"],
  computed: {
    isDragging() {
      const dragItem = this.options.dragItem;
      return dragItem;
    }
  },
  methods: {
    onMouseEnter(event) {
      if (!this.options.dragItem)
        return;
      this.notifyMouseEnter(this.group, event, this.listId, null);
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", null, [
    createElementVNode("div", {
      class: "nestable-list-empty",
      onMouseenter: _cache[0] || (_cache[0] = (...args) => $options.onMouseEnter && $options.onMouseEnter(...args))
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 32)
  ]);
}
var Placeholder = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
var nestableHelpers = {
  methods: {
    getPathById(id, items = this.value) {
      let path = [];
      items.every((item, i) => {
        if (item[this.keyProp] === id) {
          path.push(i);
        } else if (item[this.childrenProp]) {
          const childrenPath = this.getPathById(id, item[this.childrenProp]);
          if (childrenPath.length) {
            path = path.concat(i).concat(childrenPath);
          }
        }
        return path.length === 0;
      });
      return path;
    },
    getItemByPath(path, items = this.value) {
      let item = null;
      path.forEach((index) => {
        const list = item && item[this.childrenProp] ? item[this.childrenProp] : items;
        item = list[index];
      });
      return item;
    },
    getItemDepth(item) {
      let level = 1;
      if (item[this.childrenProp] && item[this.childrenProp].length > 0) {
        const childrenDepths = item[this.childrenProp].map(this.getItemDepth);
        level += Math.max(...childrenDepths);
      }
      return level;
    },
    getSplicePath(path, options = {}) {
      const splicePath = {};
      const numToRemove = options.numToRemove || 0;
      const itemsToInsert = options.itemsToInsert || [];
      const lastIndex = path.length - 1;
      let currentPath = splicePath;
      path.forEach((index, i) => {
        if (i === lastIndex) {
          currentPath.$splice = [[index, numToRemove, ...itemsToInsert]];
        } else {
          const nextPath = {};
          currentPath[index] = { [options.childrenProp]: nextPath };
          currentPath = nextPath;
        }
      });
      return splicePath;
    },
    getRealNextPath(prevPath, nextPath) {
      const ppLastIndex = prevPath.length - 1;
      const npLastIndex = nextPath.length - 1;
      if (prevPath.length < nextPath.length) {
        let wasShifted = false;
        return nextPath.map((nextIndex, i) => {
          if (wasShifted) {
            return i === npLastIndex ? nextIndex + 1 : nextIndex;
          }
          if (typeof prevPath[i] !== "number") {
            return nextIndex;
          }
          if (nextPath[i] > prevPath[i] && i === ppLastIndex) {
            wasShifted = true;
            return nextIndex - 1;
          }
          return nextIndex;
        });
      } else if (prevPath.length === nextPath.length) {
        if (nextPath[npLastIndex] > prevPath[npLastIndex]) {
          const target = this.getItemByPath(nextPath);
          if (target[this.childrenProp] && target[this.childrenProp].length && !this.isCollapsed(target)) {
            return nextPath.slice(0, -1).concat(nextPath[npLastIndex] - 1).concat(0);
          }
        }
      }
      return nextPath;
    }
  }
};
var callsHooks = {
  methods: {
    hook(name, params) {
      if (!this.hooks[name])
        return true;
      const result = this.hooks[name](params);
      return result || result === void 0;
    }
  }
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var immutabilityHelper = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function stringifiable(obj) {
    return typeof obj === "object" && !("toString" in obj) ? Object.prototype.toString.call(obj).slice(8, -1) : obj;
  }
  var isProduction = typeof process === "object" && true;
  function invariant(condition, message) {
    if (!condition) {
      if (isProduction) {
        throw new Error("Invariant failed");
      }
      throw new Error(message());
    }
  }
  exports.invariant = invariant;
  var hasOwnProperty2 = Object.prototype.hasOwnProperty;
  var splice = Array.prototype.splice;
  var toString = Object.prototype.toString;
  function type(obj) {
    return toString.call(obj).slice(8, -1);
  }
  var assign = Object.assign || function(target, source) {
    getAllKeys(source).forEach(function(key) {
      if (hasOwnProperty2.call(source, key)) {
        target[key] = source[key];
      }
    });
    return target;
  };
  var getAllKeys = typeof Object.getOwnPropertySymbols === "function" ? function(obj) {
    return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
  } : function(obj) {
    return Object.keys(obj);
  };
  function copy(object) {
    return Array.isArray(object) ? assign(object.constructor(object.length), object) : type(object) === "Map" ? new Map(object) : type(object) === "Set" ? new Set(object) : object && typeof object === "object" ? assign(Object.create(Object.getPrototypeOf(object)), object) : object;
  }
  var Context = function() {
    function Context2() {
      this.commands = assign({}, defaultCommands);
      this.update = this.update.bind(this);
      this.update.extend = this.extend = this.extend.bind(this);
      this.update.isEquals = function(x, y) {
        return x === y;
      };
      this.update.newContext = function() {
        return new Context2().update;
      };
    }
    Object.defineProperty(Context2.prototype, "isEquals", {
      get: function() {
        return this.update.isEquals;
      },
      set: function(value) {
        this.update.isEquals = value;
      },
      enumerable: true,
      configurable: true
    });
    Context2.prototype.extend = function(directive, fn) {
      this.commands[directive] = fn;
    };
    Context2.prototype.update = function(object, $spec) {
      var _this = this;
      var spec = typeof $spec === "function" ? { $apply: $spec } : $spec;
      if (!(Array.isArray(object) && Array.isArray(spec))) {
        invariant(!Array.isArray(spec), function() {
          return "update(): You provided an invalid spec to update(). The spec may not contain an array except as the value of $set, $push, $unshift, $splice or any custom command allowing an array value.";
        });
      }
      invariant(typeof spec === "object" && spec !== null, function() {
        return "update(): You provided an invalid spec to update(). The spec and every included key path must be plain objects containing one of the " + ("following commands: " + Object.keys(_this.commands).join(", ") + ".");
      });
      var nextObject = object;
      getAllKeys(spec).forEach(function(key) {
        if (hasOwnProperty2.call(_this.commands, key)) {
          var objectWasNextObject = object === nextObject;
          nextObject = _this.commands[key](spec[key], nextObject, spec, object);
          if (objectWasNextObject && _this.isEquals(nextObject, object)) {
            nextObject = object;
          }
        } else {
          var nextValueForKey = type(object) === "Map" ? _this.update(object.get(key), spec[key]) : _this.update(object[key], spec[key]);
          var nextObjectValue = type(nextObject) === "Map" ? nextObject.get(key) : nextObject[key];
          if (!_this.isEquals(nextValueForKey, nextObjectValue) || typeof nextValueForKey === "undefined" && !hasOwnProperty2.call(object, key)) {
            if (nextObject === object) {
              nextObject = copy(object);
            }
            if (type(nextObject) === "Map") {
              nextObject.set(key, nextValueForKey);
            } else {
              nextObject[key] = nextValueForKey;
            }
          }
        }
      });
      return nextObject;
    };
    return Context2;
  }();
  exports.Context = Context;
  var defaultCommands = {
    $push: function(value, nextObject, spec) {
      invariantPushAndUnshift(nextObject, spec, "$push");
      return value.length ? nextObject.concat(value) : nextObject;
    },
    $unshift: function(value, nextObject, spec) {
      invariantPushAndUnshift(nextObject, spec, "$unshift");
      return value.length ? value.concat(nextObject) : nextObject;
    },
    $splice: function(value, nextObject, spec, originalObject) {
      invariantSplices(nextObject, spec);
      value.forEach(function(args) {
        invariantSplice(args);
        if (nextObject === originalObject && args.length) {
          nextObject = copy(originalObject);
        }
        splice.apply(nextObject, args);
      });
      return nextObject;
    },
    $set: function(value, _nextObject, spec) {
      invariantSet(spec);
      return value;
    },
    $toggle: function(targets, nextObject) {
      invariantSpecArray(targets, "$toggle");
      var nextObjectCopy = targets.length ? copy(nextObject) : nextObject;
      targets.forEach(function(target) {
        nextObjectCopy[target] = !nextObject[target];
      });
      return nextObjectCopy;
    },
    $unset: function(value, nextObject, _spec, originalObject) {
      invariantSpecArray(value, "$unset");
      value.forEach(function(key) {
        if (Object.hasOwnProperty.call(nextObject, key)) {
          if (nextObject === originalObject) {
            nextObject = copy(originalObject);
          }
          delete nextObject[key];
        }
      });
      return nextObject;
    },
    $add: function(values, nextObject, _spec, originalObject) {
      invariantMapOrSet(nextObject, "$add");
      invariantSpecArray(values, "$add");
      if (type(nextObject) === "Map") {
        values.forEach(function(_a) {
          var key = _a[0], value = _a[1];
          if (nextObject === originalObject && nextObject.get(key) !== value) {
            nextObject = copy(originalObject);
          }
          nextObject.set(key, value);
        });
      } else {
        values.forEach(function(value) {
          if (nextObject === originalObject && !nextObject.has(value)) {
            nextObject = copy(originalObject);
          }
          nextObject.add(value);
        });
      }
      return nextObject;
    },
    $remove: function(value, nextObject, _spec, originalObject) {
      invariantMapOrSet(nextObject, "$remove");
      invariantSpecArray(value, "$remove");
      value.forEach(function(key) {
        if (nextObject === originalObject && nextObject.has(key)) {
          nextObject = copy(originalObject);
        }
        nextObject.delete(key);
      });
      return nextObject;
    },
    $merge: function(value, nextObject, _spec, originalObject) {
      invariantMerge(nextObject, value);
      getAllKeys(value).forEach(function(key) {
        if (value[key] !== nextObject[key]) {
          if (nextObject === originalObject) {
            nextObject = copy(originalObject);
          }
          nextObject[key] = value[key];
        }
      });
      return nextObject;
    },
    $apply: function(value, original) {
      invariantApply(value);
      return value(original);
    }
  };
  var defaultContext = new Context();
  exports.isEquals = defaultContext.update.isEquals;
  exports.extend = defaultContext.extend;
  exports.default = defaultContext.update;
  exports.default.default = module.exports = assign(exports.default, exports);
  function invariantPushAndUnshift(value, spec, command) {
    invariant(Array.isArray(value), function() {
      return "update(): expected target of " + stringifiable(command) + " to be an array; got " + stringifiable(value) + ".";
    });
    invariantSpecArray(spec[command], command);
  }
  function invariantSpecArray(spec, command) {
    invariant(Array.isArray(spec), function() {
      return "update(): expected spec of " + stringifiable(command) + " to be an array; got " + stringifiable(spec) + ". Did you forget to wrap your parameter in an array?";
    });
  }
  function invariantSplices(value, spec) {
    invariant(Array.isArray(value), function() {
      return "Expected $splice target to be an array; got " + stringifiable(value);
    });
    invariantSplice(spec.$splice);
  }
  function invariantSplice(value) {
    invariant(Array.isArray(value), function() {
      return "update(): expected spec of $splice to be an array of arrays; got " + stringifiable(value) + ". Did you forget to wrap your parameters in an array?";
    });
  }
  function invariantApply(fn) {
    invariant(typeof fn === "function", function() {
      return "update(): expected spec of $apply to be a function; got " + stringifiable(fn) + ".";
    });
  }
  function invariantSet(spec) {
    invariant(Object.keys(spec).length === 1, function() {
      return "Cannot have more than one key in an object with $set";
    });
  }
  function invariantMerge(target, specValue) {
    invariant(specValue && typeof specValue === "object", function() {
      return "update(): $merge expects a spec of type 'object'; got " + stringifiable(specValue);
    });
    invariant(target && typeof target === "object", function() {
      return "update(): $merge expects a target of type 'object'; got " + stringifiable(target);
    });
  }
  function invariantMapOrSet(target, command) {
    var typeOfTarget = type(target);
    invariant(typeOfTarget === "Map" || typeOfTarget === "Set", function() {
      return "update(): " + stringifiable(command) + " expects a target of type Set or Map; got " + stringifiable(typeOfTarget);
    });
  }
})(immutabilityHelper, immutabilityHelper.exports);
var update = /* @__PURE__ */ getDefaultExportFromCjs(immutabilityHelper.exports);
const closest = (target, selector) => {
  return target.closest(selector);
};
const getOffsetRect = (elem) => {
  var box = elem.getBoundingClientRect();
  return { top: Math.round(box.top), left: Math.round(box.left) };
};
const getTransformProps = (x, y) => {
  return {
    transform: "translate(" + x + "px, " + y + "px)"
  };
};
const listWithChildren = (list, childrenProp) => {
  return list.map((item) => {
    return __spreadProps(__spreadValues({}, item), {
      [childrenProp]: item[childrenProp] ? listWithChildren(item[childrenProp], childrenProp) : []
    });
  });
};
const _sfc_main$1 = {
  name: "VueNestable",
  components: {
    NestableItem,
    Placeholder
  },
  mixins: [nestableHelpers, groupsObserver, callsHooks],
  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },
    threshold: {
      type: Number,
      required: false,
      default: 30
    },
    maxDepth: {
      type: Number,
      required: false,
      default: 10
    },
    keyProp: {
      type: String,
      required: false,
      default: "id"
    },
    classProp: {
      type: String,
      required: false,
      default: null
    },
    group: {
      type: [String, Number],
      required: false,
      default: () => Math.random().toString(36).slice(2)
    },
    childrenProp: {
      type: String,
      required: false,
      default: "children"
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    hooks: {
      type: Object,
      required: false,
      default: () => ({})
    },
    rtl: {
      type: Boolean,
      required: false,
      default: false
    },
    expandable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  provide() {
    return {
      listId: this.listId,
      group: this.group,
      keyProp: this.keyProp,
      onDragEnd: this.onDragEnd
    };
  },
  data() {
    return {
      itemsOld: null,
      dragItem: null,
      mouse: {
        last: { x: 0 },
        shift: { x: 0 }
      },
      el: null,
      elCopyStyles: null,
      isDirty: false,
      collapsedGroups: [],
      listId: Math.random().toString(36).slice(2)
    };
  },
  computed: {
    listIsEmpty() {
      return this.value.length === 0;
    },
    itemOptions() {
      return {
        dragItem: this.dragItem,
        keyProp: this.keyProp,
        classProp: this.classProp,
        childrenProp: this.childrenProp,
        expandable: this.expandable
      };
    },
    listStyles() {
      const el = document.querySelector(".nestable-" + this.group + " .nestable-item-" + this.dragItem[this.keyProp]);
      let listStyles = {};
      if (el) {
        listStyles.width = `${el.clientWidth}px`;
      }
      if (this.elCopyStyles) {
        listStyles = __spreadValues(__spreadValues({}, listStyles), this.elCopyStyles);
      }
      return listStyles;
    }
  },
  created() {
    const items = listWithChildren(this.value, this.childrenProp);
    this.$emit("input", items);
    this.isDirty = false;
    this.registerNestable(this);
  },
  beforeDestroy() {
    this.stopTrackMouse();
  },
  methods: {
    startTrackMouse() {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onDragEnd);
      document.addEventListener("touchend", this.onDragEnd);
      document.addEventListener("touchcancel", this.onDragEnd);
      document.addEventListener("keydown", this.onKeyDown);
    },
    stopTrackMouse() {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onDragEnd);
      document.removeEventListener("touchend", this.onDragEnd);
      document.removeEventListener("touchcancel", this.onDragEnd);
      document.removeEventListener("keydown", this.onKeyDown);
      this.elCopyStyles = null;
    },
    onDragStart(event, item) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.el = closest(event.target, ".nestable-item");
      this.startTrackMouse();
      this.dragItem = item;
      this.itemsOld = this.value;
      this.$nextTick(() => {
        this.onMouseMove(event);
      });
    },
    onDragEnd(event, isCancel) {
      event && event.preventDefault();
      this.stopTrackMouse();
      this.el = null;
      isCancel ? this.dragRevert() : this.dragApply();
    },
    onKeyDown(event) {
      if (event.which === 27) {
        this.onDragEnd(null, true);
      }
    },
    getXandYFromEvent(event) {
      let { clientX, clientY } = event;
      const { targetTouches } = event;
      if (targetTouches) {
        const touch = targetTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
        const event2 = new Event("mouseenter");
        const element = document.elementFromPoint(clientX, clientY);
        const touchElement = element && (element.closest(".nestable-item-content") || element.closest(".nestable-list-empty"));
        if (touchElement)
          touchElement.dispatchEvent(event2);
      }
      return { clientX, clientY };
    },
    onMouseMove(event) {
      event && event.preventDefault();
      const { clientX, clientY } = this.getXandYFromEvent(event);
      if (this.mouse.last.x === 0) {
        this.mouse.last.x = clientX;
      }
      const transformProps = getTransformProps(clientX, clientY);
      const elDragLayer = document.querySelector(".nestable-" + this.group + " .nestable-drag-layer");
      if (!elDragLayer)
        return;
      const { top: dragLayerTop, left: dragLayerLeft } = elDragLayer.getBoundingClientRect();
      const elCopy = document.querySelector(".nestable-" + this.group + " .nestable-drag-layer > .nestable-list");
      if (!this.elCopyStyles) {
        const offset = getOffsetRect(this.el);
        this.elCopyStyles = __spreadValues({
          marginTop: `${offset.top - clientY - dragLayerTop}px`,
          marginLeft: `${offset.left - clientX - dragLayerLeft}px`
        }, transformProps);
      } else {
        this.elCopyStyles = __spreadValues(__spreadValues({}, this.elCopyStyles), transformProps);
        if (elCopy) {
          for (const key in transformProps) {
            if (Object.prototype.hasOwnProperty.call(transformProps, key)) {
              elCopy.style[key] = transformProps[key];
            }
          }
        }
        const diffX = this.rtl ? this.mouse.last.x - clientX : clientX - this.mouse.last.x;
        if (diffX >= 0 && this.mouse.shift.x >= 0 || diffX <= 0 && this.mouse.shift.x <= 0) {
          this.mouse.shift.x += diffX;
        } else {
          this.mouse.shift.x = 0;
        }
        this.mouse.last.x = clientX;
        if (Math.abs(this.mouse.shift.x) > this.threshold) {
          if (this.mouse.shift.x > 0) {
            this.tryIncreaseDepth(this.dragItem);
          } else {
            this.tryDecreaseDepth(this.dragItem);
          }
          this.mouse.shift.x = 0;
        }
      }
    },
    moveItem({ dragItem, pathFrom, pathTo }) {
      const realPathTo = this.getRealNextPath(pathFrom, pathTo);
      const removePath = this.getSplicePath(pathFrom, {
        numToRemove: 1,
        childrenProp: this.childrenProp
      });
      const insertPath = this.getSplicePath(realPathTo, {
        numToRemove: 0,
        itemsToInsert: [dragItem],
        childrenProp: this.childrenProp
      });
      if (this.expandable) {
        const isOpen = dragItem.expanded;
        let path = realPathTo;
        path.pop();
        this.lastTouchedPath = path;
        let item = this.getItemByPath(path);
        if (item) {
          item.expanded = true;
        }
        if (!isOpen && dragItem.expanded) {
          dragItem.expanded = false;
        }
      }
      if (!this.hook("beforeMove", { dragItem, pathFrom, pathTo: realPathTo }))
        return;
      let items = this.value;
      items = update(items, removePath);
      items = update(items, insertPath);
      this.isDirty = true;
      this.pathTo = realPathTo;
      this.$emit("input", items);
    },
    tryIncreaseDepth(dragItem) {
      const pathFrom = this.getPathById(dragItem[this.keyProp]);
      const itemIndex = pathFrom[pathFrom.length - 1];
      const newDepth = pathFrom.length + this.getItemDepth(dragItem);
      if (itemIndex > 0 && newDepth <= this.maxDepth) {
        const prevSibling = this.getItemByPath(pathFrom.slice(0, -1).concat(itemIndex - 1));
        if (prevSibling[this.childrenProp] && (!prevSibling[this.childrenProp].length || !this.isCollapsed(prevSibling))) {
          const pathTo = pathFrom.slice(0, -1).concat(itemIndex - 1).concat(prevSibling[this.childrenProp].length);
          this.moveItem({ dragItem, pathFrom, pathTo });
        }
      }
    },
    tryDecreaseDepth(dragItem) {
      const pathFrom = this.getPathById(dragItem[this.keyProp]);
      const itemIndex = pathFrom[pathFrom.length - 1];
      if (pathFrom.length > 1) {
        const parent = this.getItemByPath(pathFrom.slice(0, -1));
        if (itemIndex + 1 === parent[this.childrenProp].length) {
          const pathTo = pathFrom.slice(0, -1);
          pathTo[pathTo.length - 1] += 1;
          this.moveItem({ dragItem, pathFrom, pathTo });
        }
      }
    },
    onMouseEnter(event, eventList, item) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const dragItem = this.dragItem;
      if (!dragItem)
        return;
      if (item !== null && dragItem[this.keyProp] === item[this.keyProp])
        return;
      const pathFrom = this.getPathById(dragItem[this.keyProp]);
      if (eventList !== this.listId && pathFrom.length === 0)
        return;
      let pathTo;
      if (item === null) {
        pathTo = pathFrom.length > 0 ? [] : [0];
      } else {
        pathTo = this.getPathById(item[this.keyProp]);
      }
      const newDepth = this.getRealNextPath(pathFrom, pathTo).length + (this.getItemDepth(dragItem) - 1);
      if (newDepth > this.maxDepth) {
        return;
      }
      let collapseProps = {};
      if (this.collapsed && pathFrom.length > 1) {
        const parent = this.getItemByPath(pathFrom.slice(0, -1));
        if (parent[this.childrenProp].length === 1) {
          collapseProps = this.onToggleCollapse(parent, true);
        }
      }
      this.moveItem({ dragItem, pathFrom, pathTo }, collapseProps);
    },
    isCollapsed(item) {
      return !!(this.collapsedGroups.indexOf(item[this.keyProp]) > -1 ^ this.collapsed);
    },
    dragApply() {
      this.$emit("change", this.dragItem, { items: this.value, pathTo: this.pathTo });
      this.pathTo = null;
      this.itemsOld = null;
      this.dragItem = null;
      this.isDirty = false;
    },
    dragRevert() {
      this.$emit("input", this.itemsOld);
      this.pathTo = null;
      this.itemsOld = null;
      this.dragItem = null;
      this.isDirty = false;
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" No content ");
const _hoisted_2 = {
  key: 0,
  class: "nestable-drag-layer"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Placeholder = resolveComponent("Placeholder");
  const _component_NestableItem = resolveComponent("NestableItem");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["nestable", `nestable-${$props.group}`, $props.rtl ? "nestable-rtl" : ""])
  }, [
    createElementVNode("ol", {
      class: normalizeClass(["nestable-list nestable-group", { "expandable": $props.expandable }])
    }, [
      $options.listIsEmpty ? (openBlock(), createBlock(_component_Placeholder, {
        key: 0,
        options: $options.itemOptions
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "placeholder", {}, () => [
            _hoisted_1
          ])
        ]),
        _: 3
      }, 8, ["options"])) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (item, index) => {
        return openBlock(), createBlock(_component_NestableItem, {
          key: item[$props.keyProp],
          index,
          item,
          options: $options.itemOptions
        }, {
          default: withCtx((slotData) => [
            renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotData)))
          ]),
          _: 2
        }, 1032, ["index", "item", "options"]);
      }), 128))
    ], 2),
    $data.dragItem ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createElementVNode("ol", {
        style: normalizeStyle($options.listStyles),
        class: "nestable-list"
      }, [
        createVNode(_component_NestableItem, {
          item: $data.dragItem,
          options: $options.itemOptions,
          "is-copy": true
        }, {
          default: withCtx((slotData) => [
            renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotData)))
          ]),
          _: 3
        }, 8, ["item", "options"])
      ], 4)
    ])) : createCommentVNode("", true)
  ], 2);
}
var VueNestable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "VueNestableHandle",
  mixins: [groupsObserver],
  props: {
    item: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  inject: ["group", "onDragEnd"],
  methods: {
    isEmpty(obj) {
      if (obj == null)
        return true;
      if (obj.length > 0)
        return false;
      if (obj.length === 0)
        return true;
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
          return false;
      }
      return true;
    },
    dragstart(event) {
      const item = this.isEmpty(this.item) ? this.$parent.item : this.item;
      this.notifyDragStart(this.group, event, item);
    },
    touchend(event) {
      console.log(event);
      this.onDragEnd(event);
    },
    touchmove(event) {
      console.log(event);
      this.notifyMouseMove(this.group, event);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    draggable: "true",
    class: "nestable-handle",
    onDragstart: _cache[0] || (_cache[0] = (...args) => $options.dragstart && $options.dragstart(...args)),
    onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.dragstart && $options.dragstart(...args)),
    onTouchend: _cache[2] || (_cache[2] = (...args) => $options.touchend && $options.touchend(...args)),
    onTouchmove: _cache[3] || (_cache[3] = (...args) => $options.touchmove && $options.touchmove(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 32);
}
var VueNestableHandle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var main = {
  install: function(Vue) {
    Vue.component("VueNestable", VueNestable);
    Vue.component("VueNestableHandle", VueNestableHandle);
  }
};
export { VueNestable, VueNestableHandle, main as default };
