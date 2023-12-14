import StatusComponent from '../../components/success_component/status_component';

const AlreadyInputPage = () => {
  return (
    <StatusComponent
      title="Data Anda sudah diterima!"
      status="success"
      message="Apabila merasa ada data yang salah dapat langsung kontak ke admin."
    />
  );
};

export default AlreadyInputPage;