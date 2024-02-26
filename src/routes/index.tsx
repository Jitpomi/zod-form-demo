import {component$, useStore} from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import {type ZodType} from '~/components/ZodForm/zodform-schema';
import ZodForm from '~/components/ZodForm';
import TextInput from '~/components/TextInput';



export default component$(() => {

 const data = useStore<ZodType>({
    title: 'Hey',
    today: '2024/31/02'
  })

  return (
    <>
      <h1>{data.title} 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding. {data.today}
      </p>
      <h6>Normal Use For TextInput</h6>
      <TextInput
        label={'See me'}
        value={data.title}
        onInput$={(val)=>data.title = val}
      />
      <TextInput
        type={'date'}
        label={'Today'}
        value={data.today}
        onInput$={(val)=>data.today = val}
      />
      <h6>Normal Form Wont submit TextInput</h6>
      <p style={'font-size: 10px'}> event fires but disappears</p>
      <b>Justification for zod forms</b>
      <form onSubmit$={(e)=>console.log('event: ',e)}>
        <TextInput
          label={'See me'}
          value={data.title}
          onInput$={(val)=>data.title = val}
        />
        <TextInput
          type={'date'}
          label={'Today'}
          value={data.today}
          onInput$={(val)=>data.today = val}
        />
        <button type={'submit'}>Send</button>
      </form>
      <h6>Zod Form</h6>
      <p style={'font-size: 10px'}> with validation and form submission</p>
      <ZodForm onSubmit$={(val)=>{
        data.title =val.title
        data.today =val.today
      }}/>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
