import React from 'react';
import CardComponent from './card_component.jsx';

const MainContentComponent = () => {
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <CardComponent title="Bahasa" content="Memperkaya pemahaman siswa dalam bidang linguistik dan sastra. 
            Menawarkan keterampilan komunikasi yang kuat, pemahaman mendalam terhadap keanekaragaman budaya, 
            dan penguasaan bahasa asing." />
        <CardComponent title="IPS" content="Mendalami pengetahuan tentang masyarakat, sejarah, dan ilmu sosial. 
            Membekali siswa dengan pemahaman mendalam tentang dinamika sosial, politik, 
            dan ekonomi untuk mengembangkan wawasan kritis dan analitis." />
        <CardComponent title="IPA" content="Fokus pada eksplorasi dan pemahaman ilmu pengetahuan alam. 
            Menyediakan pengetahuan mendalam dalam bidang matematika, fisika, biologi, dan kimia. 
            Mendorong pemikiran ilmiah dan pengembangan keterampilan riset." />
      </div>
    </div>
  );
};

export default MainContentComponent;