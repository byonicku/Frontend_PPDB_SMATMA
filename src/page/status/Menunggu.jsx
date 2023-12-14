import StatusComponent from '../../components/success_component/status_component';

const Menunggu = () => {
  return (
    <StatusComponent
      title="Silahkan tunggu konfirmasi dari admin!"
      status="menunggu"
      message="Data anda sedang diproses oleh admin"
    />
  );
};

export default Menunggu;