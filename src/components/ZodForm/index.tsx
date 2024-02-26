import {$, component$, type QRL} from '@builder.io/qwik';
import TextInput from '~/components/TextInput';
import {ZodFormSchema, type ZodType} from '~/components/ZodForm/zodform-schema';
import {formAction$, type SubmitHandler, useForm, zodForm$} from '@modular-forms/qwik';

export interface ZodFormProps {
  onSubmit$?: QRL<(data: ZodType) => void>;
}

export const useFormAction = formAction$<ZodType>((values) => {
  // Runs on server
  console.log('value: ', values);
}, zodForm$(ZodFormSchema));


const ZodForm = component$<ZodFormProps>((props) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_loginForm, {Form, Field}] = useForm<ZodType>({
    loader: {
      value: {
        title: undefined,
        today: undefined,
      },
    },
    validate: zodForm$(ZodFormSchema),
    action: useFormAction(),
  });

  const handleSubmit: QRL<SubmitHandler<ZodType>> = $((values, event) => {
    // Runs on client
    console.log('data: ',values);
    console.log('event: ',event);
    if( props.onSubmit$){
      props.onSubmit$(values).catch()
    }

  });

  return (
    <Form onSubmit$={handleSubmit}>
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
            {field.error && <div>{field.error}</div>}
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
            {field.error && <div>{field.error}</div>}
          </div>
        }
      </Field>

      <button type={'submit'}>
        Send
      </button>
    </Form>
  );
});
export default ZodForm;