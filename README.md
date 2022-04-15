# vue3-nestable

Drag & drop hierarchical list made as a vue component.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/vue3-nestable.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/vue3-nestable

## Vue 3 support 🥳
> This package is currently compatible with Vue 3


<hr />


## Goals
  - A simple vue component to create a draggable list to customizable items
  - Reorder items by dragging them above another item
  - Intuitively nest items by dragging right
  - Fully customizable, ships with no CSS
  - Everything is configurable: item identifier, max nesting level, threshold
    for nesting


## Table of contents
  * [Demo](#Demo)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Example](#example)
  * [Styling](#styling)
  * [Props](#props)
  * [Slots](#slots)
  * [Events](#events)
  * [Hooks](#hooks)


## Installation

Install the plugin:

```sh
npm install --save vue3-nestable
yarn add vue3-nestable
```

Use the plugin in your app:

```js
import Vue from 'vue'
import VueNestable from 'vue3-nestable'

Vue.use(VueNestable)
```

You can also import the components on-demand, if you wish to do so:
```js
import { VueNestable, VueNestableHandle } from 'vue3-nestable'

export default {
  components: {
    VueNestable,
    VueNestableHandle
  }
  ...
}
```


## Example

You only need two components: `vue-nestable` which renders the list and
`vue-nestable-handle` which indicates the area the user can drag the item by.

**Important Note:** Each item must have a unique `id` property and it must be a
valid css class name. It can not contain a `:`, `,`, `.`, `;` or other special
characters that are invalid in a css class name.

```html
<template>

  <vue-nestable :value="nestableItems" @input="nestableItems = $event">
    <template v-slot="slot">
      <vue-nestable-handle>
        {{ slot.item.text }}
      </vue-nestable-handle>
    </template>
  </vue-nestable>

  <pre>
    <code>
      {{ nestableItems }}
    </code>
  </pre>
</template>

<script>
  import { VueNestable, VueNestableHandle } from 'vue3-nestable'

  export default {
    components: {
      VueNestable,
      VueNestableHandle,
    },
    data: () => ({
      nestableItems: [
        {
          id: 0,
          text: 'Andy'
        }, {
          id: 1,
          text: 'Harry',
          children: [{
            id: 2,
            text: 'David 1',
            children: [{
              id: 3,
              text: 'David 2'
            }, {
              id: 4,
              text: 'Lisa'
            }]
          }, {
            id: 5,
            text: 'Lisa 2'
          }, {
            id: 6,
            text: 'Lisa 3'
          }]
        }, {
          id: 7,
          text: 'Lisa 4'
        }
      ]
    })
  }
</script>
```


## Styling

By default, vue3-nestable comes without any styling. Which means you can
customize the appearance completely to your needs. However, if you want you can
take a look at the style used in the demo:
[example/assets/vue-nestable.css](example/assets/vue-nestable.css)


## Props

The following props can be passed to the `<VueNestable>` Component:

| Property     | Type                | Default       | Description                                                                                                                                                                                                                     |
| :----------- | :------------------ | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value        | Array               | [ ]           | Array of objects to be used in the list. **Important:** Each item must have a unique key by which it can be identified. By default the key is assumed to be named `id` but you can change it by setting the `keyProp` property. |
| threshold    | Number              | 30            | Amount of pixels by which the mouse must be move horizontally before increasing/decreasing level (nesting) of current element.                                                                                                  |
| maxDepth     | Number              | 10            | Maximum available level of nesting. Setting this to 0 will prevent dragging altogether.                                                                                                                                         |
| group        | String or Number    | random String | Different group numbers may be passed if you have more than one nestable component on a page and want some extra styles for portal instances.                                                                                   |
| keyProp      | String *(Optional)* | 'id'          | Name of the property that uniquely identifies an item.                                                                                                                                                                          |
| childrenProp | String *(Optional)* | 'children'    | Name of the property that holds an array of children.                                                                                                                                                                           |
| class        | String *(Optional)* | null          | Name of the property for classes to add to the item.                                                                                                                                                                            |
| hooks        | Object *(Optional)* | {}            | Allows you to register hooks that fire whenever vue-nestable performs some action                                                                                                                                               |
| rtl        | Boolean *(Optional)* | false            | Add rtl support to vue-nestable                                                                                                                                               |


## Slots

The `<VueNestable>` Component has two slots that can be used to render items and
a placeholder. See [Example](example/components/NoItems.vue) for an example on
how to use them.

| Slot Name   | Props                      | Description                                                                                                   |
| :---------- | :------------------------- | :------------------------------------------------------------------------------------------------------------ |
| default     | `item`, `index`, `isChild` | This slot is used to render the items in the list, use the scoped-slot property `item` to render the element. |
| placeholder |                            | Lets you define a custom template that is used when no elements are in the list                               |


## Events

Events are triggered when an item was moved or when a drag operation was
completed. When you use `v-model` to bind your data, the `@input` event will
automatically be handled.

| Event  | Parameters         | Description                                                                                                                                                   |
| :----- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| input  | `value`            | triggered whenever the list changes                                                                                                                           |
| change | `value`, `options` | triggered when the user dropped the item. `options` is passed as the second parameter in the event and contains the following properties: `{ items, pathTo }` |


## Hooks

Hooks allow you to get finer controll over which items can be moved or take
action when a specific item is moved.

Hooks are passed as an Object to the `:hooks` prop. The object defines a key
with the hook name and a function that will be called when the hook fires.

```js
{
  'beforeMove': this.myHookFunction
}
```

Look [here](example/components/Advanced.vue) of an example on how to prevent one
item from being moved.


| Hook Name     | Parameters                       | Description                                                                                  |
| :------------ | :------------------------------- | :------------------------------------------------------------------------------------------- |
| beforeMove    | `{ dragItem, pathFrom, pathTo }` | Fires when an item is about to be moved. Returning `false` will cancel that action.          |
