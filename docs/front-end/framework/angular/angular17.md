# Angular17

## Official
[https://angular.dev/](https://angular.dev/)

## [Signals](https://angular.dev/guide/signals#writable-signals)

### Writable signals

```js
const count = signal(0);
// Signals are getter functions - calling them reads their value.
console.log('The count is: ' + count());

// use `set` to update
count.set(3);
//or use `update` to update `count`
count.update(value => value + 1);
```

::: tip
When creating a signal, you can `optionally provide an equality function`, which will be used to check whether the new value is actually different than the previous one.
```js
import _ from 'lodash';
const data = signal(['test'], {equal: _.isEqual}); // [!code ++]
// Even though this is a different array instance, the deep equality
// function will consider the values to be equal, and the signal won't
// trigger any updates.
data.set(['test']);
```
:::

Equality functions can be provided to both writable and computed signals.

::: tip
`HELPFUL`: By default, signals use referential equality (`===` comparison).
:::

### Computed signals

```js
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

## [Effects](https://angular.dev/guide/signals#effects)


::: danger
### When not to use effects
Avoid using effects for propagation of state changes. This can result in `ExpressionChangedAfterItHasBeenChecked` errors, infinite circular updates, or unnecessary change detection cycles.

Because of these risks, Angular by default prevents you from setting signals in effects. It can be enabled if absolutely necessary by setting the `allowSignalWrites` flag when you create an effect.

Instead, use `computed signals` to model state that depends on other state.
:::

### [Injection-context](https://angular.dev/guide/signals#injection-context)

By default, you can only create an `effect()` within an `injection context` (where you have access to the `inject` function). The easiest way to satisfy this requirement is to call `effect` within a component, directive, or service `constructor`:

::: code-group
```js [RegisterInConstructor.js]
@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);
  constructor() {
    // Register a new effect.
    effect(() => {
      console.log(`The count is: ${this.count()})`);
    });
  }
}
```

```js [AssignEffectToAField]
// Alternatively, you can assign the effect to a `field` 
// (which also gives it a descriptive name).

@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);
  private loggingEffect = effect(() => { // [!code ++]
    console.log(`The count is: ${this.count()})`);
  });
}
```


```js [passAnInjectorToEffect]
// To create an effect outside of the constructor
//  you can pass an `Injector` to `effect` via its options:

@Component({...})
export class EffectiveCounterComponent {
  readonly count = signal(0);
  constructor(private injector: Injector) {}// [!code ++]
  initializeLogging(): void {
    effect(() => {
      console.log(`The count is: ${this.count()})`);
    }, {injector: this.injector}); // [!code ++]
  }
}
```
:::

### untracked

::: code-group

```js [PreventSignalRead.js]
// You can prevent a signal read from being tracked by calling its getter with untracked:

effect(() => {
  console.log(`User set to `${currentUser()}` and the counter is ${untracked(counter)}`);
});
```

```js [InvokeExternalCodes.js]
//untracked is also useful when an effect needs to invoke some external code which shouldn't be treated as a dependency:
effect(() => {
  const user = currentUser();
  untracked(() => {
    // If the `loggingService` reads signals, they won't be counted as
    // dependencies of this effect.
    this.loggingService.log(`User set to ${user}`);
  });
});
```

:::

### onCleanup

```js
effect((onCleanup) => {
  const user = currentUser();
  const timer = setTimeout(() => {
    console.log(`1 second ago, the user became ${user}`);
  }, 1000);
  onCleanup(() => { // [!code ++]
    clearTimeout(timer);
  });
});
```

### Destroying effects
When you create an effect, it is automatically destroyed when its enclosing context is destroyed. This means that effects created within components are destroyed when the component is destroyed. The same goes for effects within directives, services, etc.

Effects return an [`EffectRef`](https://angular.dev/api/core/EffectRef) that you can use to destroy them manually, by calling the `.destroy()` method. You can combine this with the `manualCleanup` option to create an effect that lasts until it is manually destroyed. Be careful to actually clean up such effects when they're no longer required.

## New Syntax

### Binding

::: code-group

```html [props:variable]
<!-- @Input() src: string = ; -->
<img alt="item" [src]="itemImageUrl">
```

```html [props:string]
<app-item-detail childItem="this is normal string"></app-item-detail>
```

```html [event]
<button (click)="onSave()">Save</button>
```

```html [style]
<app-sizer [(size)]="fontSizePx"></app-sizer>
<div [style.font-size.px]="fontSizePx">Resizable Text</div>
```

:::

### Control Flow

[https://angular.dev/guide/templates/control-flow](https://angular.dev/guide/templates/control-flow)

::: code-group

```js [@if]
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```

```js [@for]
@for (item of items; track item.id) {
  {{ item.name }}
}
```

```js [@empty]
@for (item of items; track item.name) {
  <li> {{ item.name }} </li>
} @empty {
  <li> There are no items. </li>
}
```

```js [@switch]
@switch (condition) {
  @case (caseA) {
    Case A.
  }
  @case (caseB) {
    Case B.
  }
  @default {
    Default case.
  }
}

```

```js [@defer&@placeholder&@loading&@error]
@defer {
  <large-component />
} @placeholder (minimum 500ms) {
  <p>Placeholder content</p>
} @loading (after 100ms; minimum 1s) {
  <img alt="loading..." src="loading.gif" />
} @error {
  <p>Failed to load the calendar</p>
}
```

:::