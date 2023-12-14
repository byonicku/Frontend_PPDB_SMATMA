import React from 'react';

const JurusanCard = () => {
    return (
        <div className="container mb-5">
            <div className="card mb-3">
                <div className="card-header">
                    Jurusan Bahasa
                </div>
                <div className="card-body">
                    <h5 className="card-title">Deskripsi Jurusan Bahasa</h5>
                    <p className="card-text">Jurusan Bahasa mempelajari tentang bahasa dan sastra dari berbagai negara, termasuk bahasa Indonesia. Jurusan ini cocok bagi kamu yang memiliki minat dalam bidang bahasa dan sastra.</p>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header">
                    Jurusan IPA
                </div>
                <div className="card-body">
                    <h5 className="card-title">Deskripsi Jurusan IPA</h5>
                    <p className="card-text">Jurusan IPA mempelajari tentang ilmu pengetahuan alam, seperti fisika, kimia, dan biologi. Jurusan ini cocok bagi kamu yang memiliki minat dalam bidang sains dan teknologi.</p>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header">
                    Jurusan IPS
                </div>
                <div className="card-body">
                    <h5 className="card-title">Deskripsi Jurusan IPS</h5>
                    <p className="card-text">Jurusan IPS mempelajari tentang ilmu sosial, seperti sejarah, geografi, dan ekonomi. Jurusan ini cocok bagi kamu yang memiliki minat dalam bidang sosial dan humaniora.</p>
                </div>
            </div>
        </div>
    );
}

export default JurusanCard;
