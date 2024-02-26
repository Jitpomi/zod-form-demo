import {component$, type QRL, useSignal, useTask$} from '@builder.io/qwik';

export interface TextInputProps {
  label?: string;
  value?: string;
  type?: string;
  onInput$?: QRL<(val: string) => void>;
}

const TextInput = component$<TextInputProps>(({
                                                label = 'Name',
                                                onInput$,
                                                value,
                                                type='text',
                                              }) => {
  const text = useSignal<string>();

  useTask$(({track}) => {
    track(() => text.value);
    if (onInput$ && text.value) {
      onInput$(text.value).catch();
    }
  });

  useTask$(({track}) => {
    track(() => value);
    text.value = value;
  });

  return (
    <div>
      <label for={'text-input'}>{label}: </label>
      <input
        id={'text-input'}
        type={type}
        bind:value={text}
      />
    </div>
  );
});
export default TextInput;
