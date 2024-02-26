import {component$, useStore} from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import {type ZodType} from '~/components/ZodForm/zodform-schema';
import ZodForm from '~/components/ZodForm';



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
