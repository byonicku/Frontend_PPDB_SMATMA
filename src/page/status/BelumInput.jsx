import StatusComponent from '../../components/success_component/status_component';

const BelumInput = () => {
  return (
    <StatusComponent
      title="Anda Belum Input Data!"
      status="failed"
      message="Silahkan input data ke menu berkas terlebih dahulu."
    />
  );
};

export default BelumInput;