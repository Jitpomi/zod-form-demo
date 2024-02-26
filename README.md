
# Modular Forms with ⚡️

This is a complete overview on modular forms with Qwik, showing you how to:
- create reusable form fields
- add validation schemas and form validation
- do form submission

## Part One
1. Started with a basic TextInput - with a `type`, `label` and 2way bound `text` signal
```ts
const TextInput = component$({
    const label = useSignal<string>();
    const type = useSignal<string>();
    const text = useSignal<string>();
  return (
      <div>
      <label for={'text-input'}>{label.value}: </label>
      <input
        id={'text-input'}
        type={type.value}
        bind:value={text}
      />
    </div>
  )
});

export default TextInput;
```
2. Made it reusable  
- made the `label` a prop 
- then added an `onInput$` prop to emit the text value to the parent whenever it changes 
- then added a `value` prop to act as a default value for the text signal that can be set from the parent and tracked it so we can change the text value whenever it changes
- finally added `type` prop so we can set the type of our custom `TextInput` from the parent 
- and thus finally had a basic reusable custom input that you can use anywhere [(see code)](https://github.com/Jitpomi/zod-form-demo/blob/main/src/components/TextInput/index.tsx).
3. Created a form-component
- defined the schema for the form data
- used my custom input in the form normally with the form data
- wraped them in an html form that has a submit button
- tried to submit 
(WITHOUT SUCCESS- HENCE JUSTIFYING THE NEED FOR MODULAR FORMS) 
```ts
const ZodForm = component$({
    const data = useStore<ZodType>({
        title: undefined,
        today: undefined,
      });
  return (
      <form onSubmit$={(e)=>console.log('event: ',e)}>
        <TextInput
          label={'See me'}
          value={data.title}
          onInput$={(val)=> data.title = val}
        />
        <TextInput
          type={'date'}
          label={'Today'}
          value={data.today}
          onInput$={(val)=> data.today = val}
        />
        <button type={'submit'}>Send</button>
      </form>
  )
});

export default ZodForm;
```
## Part Two
1. Obtained modular Form components: I used `useForm` with a `loader` that has a `value` field defining the initial value of the form data.
2. Used the modular Form components: wrapping the entire component in the `Form` component and each of my custom components with Modular Form's `Field` component, whose slot exposes a callback function with arguments `props` and `field` that should return my custom components, then destructured the `props` into my component and set the `text` value of each of my components to `field.value`  as you can see in the code below

```ts
const ZodForm = component$({
    const [_loginForm, {Form, Field}] = useForm<ZodType>({
    loader: {
      value: {
        title: undefined,
        today: undefined,
      },
    },
  });
  return (
      <Form onSubmit$={(e)=>console.log('event: ',e)}>
        <Field
        name="title"
      >
        {(field, props) =>
          <div>
            <TextInput
              {...props}
              label={'Title'}
              value={field.value}
              onInput$={(vaal) => {
                field.value = (vaal);
              }}
            />
          </div>
        }
      </Field>
        <Field name="today">
        {(field, props) =>
          <div>
            <TextInput
              {...props}
              label={'Today'}
              type={'date'}
              value={field.value}
              onInput$={(vaal) => {
                field.value = (vaal);
              }}
            />
          </div>
        }
      </Field>
        <button type={'submit'}>Send</button>
      </Form>
  )
});

export default ZodForm;
```
3. Added validation using `zodForm$`: which adds an errors field to the field from Field that i use to display each of the error messages for each field.
4. added submission handlers: the client submision handler  is a QRL added to the Form component's `onSubmit$` prop and the serverside submit handler is a `formAction` added to `useForm`. [(see code)](https://github.com/Jitpomi/zod-form-demo/blob/main/src/components/ZodForm/index.tsx)

## Take home notes: 
1. This form is used in the index file to set some signal values when the form is submited ... that's the reason i added a prop to expose the submited data to the parent
2. For cases where the initial data for the form comes from the server, we use `routeLoader` to define the initial value, hence the reason for adding `useFormLoader` in the layout file. This useFormLoader is what you would use as your `loader` in `useForm` if your usecase required setting initial values from the sever: 
```const [_loginForm, {Form, Field}] = useForm<ZodType>({
    loader: useFormLoader(),
    validate: zodForm$(ZodFormSchema),
    action: useFormAction(),
  });
```
# GOOD LUCK CREATING ⚡️ FORMS!
