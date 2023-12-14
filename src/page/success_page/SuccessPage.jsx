import StatusComponent from '../../components/success_component/status_component';

const SuccessPage = () => {
  return (
    <StatusComponent
      title="Data Anda berhasil diinputkan!"
      status="success"
      message="Apabila merasa ada data yang salah dapat langsung kontak ke admin."
    />
  );
};

export default SuccessPage;
