# Modular Forms with ⚡️
Hi guys ... as i might not find time to walk you through how to do forms the 3rd time... i have created a basic demo that you can follow ... find it here: https://github.com/Jitpomi/zod-form-demo 
it's a complete overview showing you how to create reusable form fields ... adding validation schemas ... validation ... and form submission.
if you are able to schedule a time that fits my comfort, i may show up ... but in case you don't ... this should help you figure out what to do

## part One:
1. started with a basic input ... with a label - and 2way bound text signal
2. made it reusable  - made a label a prop - then added an onInput$ prop to expose the text - then added a value prop to act as a default that can be set from the parent - finally added type prop - and finally had a basic reusable custom input that you can use anywhere
3. created a form-component - defined the schema for the form data - used my custom input in the form normally
with the form data (as i did when testing my inputs) ...wraped them in an html form that has a submit button ... tried to submit (WITHOUT SECCESS- HENCE JUSTIFYING THE NEED FOR MODULAR FORMS) - this is as far as Yolan went

## part two
in the next part
1. obtained modular Form component: -  ... I used useForm with a loader that has a value field defining the initial value of the form data ...
2. used the modular Form components: ... wrapping the entire component in the Form component and each of my custom components with Modular Form's Field component, whose slot exposes a callback function with arguments props that should return my custom components ... then destructured these props into my component ... set the valu of each of my components to field.value  as you can see in the code
3. added validation using zodForm$ which adds an errors field to the field from Field that i use to display teach of the error messags for each field as you can see in the code
4. added submission handlers: - the client submision handler  is a QRL added to the onSubmit4 PROP ON THE FORM ... AND THER SERVERSIDE submit handler is a formAction added to useForm as you can see
5. this form is used in the index file to set some signal values when the form is submited ... that's the reason i added a prop to expose the submited data to the parent
6. For cases where the initial data for the form comes from the server, we use routeLoader to define the initial value, hence the reason for adding useFormLoader in the layout file ... I HOWEVER DID NOT USE IT FOR ANYTHING ... this useFormLoader is what you would use as your loader in useForm ... if your usecase required setting initial values from the sever ... ie:

```const [_loginForm, {Form, Field}] = useForm<ZodType>({
    loader: useFormLoader(),
    validate: zodForm$(ZodFormSchema),
    action: useFormAction(),
  });
```

With this knowledge shared --- i wish you fun in creating world standard forms in Qwik
