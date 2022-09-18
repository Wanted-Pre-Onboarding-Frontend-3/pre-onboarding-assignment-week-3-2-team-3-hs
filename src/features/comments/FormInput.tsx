interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  key: number;
  _id: number;
  label: string;
}

export default function FormInput(props: FormInputProps) {
  const { label, onChange, _id, ...inputProps } = props;

  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} />
    </div>
  );
}
