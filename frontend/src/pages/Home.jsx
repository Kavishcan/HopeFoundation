import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Globe, ShieldCheck } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero" id="homeSection" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/image/banner.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '10rem 0',
                textAlign: 'center',
                color: 'white'
            }}>
                <div className="container animate-fade-in">
                    <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: '700' }}>
                        Together We Can <span className="gradient-text">Save Lives</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#e2e8f0', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Join us in making a difference—your support can bring hope, healing,
                        and a brighter future to those in need. Whether through donations,
                        volunteering, or spreading awareness, every action counts. Together,
                        we have the power to save lives and create lasting change.
                    </p>
                    <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        Start With A Little
                    </Link>
                </div>
            </section>

            {/* About Section */}
            <section id="aboutSection" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About Us</h2>
                        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
                            We are a dedicated non-profit organization committed to creating
                            positive change in the lives of vulnerable communities. Our mission is
                            to raise awareness, drive action, and support impactful projects
                            through transparency, collaboration, and compassion.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <AboutCard
                            icon="💰"
                            title="Give Donation"
                            description="Every act of kindness counts, no matter how small. Your contribution helps us reach more lives and make a greater impact. Stand with us in creating a better tomorrow — donate now."
                            link="/donate"
                            linkText="Donate Now"
                        />
                        <AboutCard
                            icon="🤝"
                            title="Become a Volunteer"
                            description="Lend your time and talents to a cause that truly matters. Together, we can uplift communities and change lives. Join us today — become a volunteer and make a difference."
                            link="/volunteer"
                            linkText="Join Now"
                        />
                        <AboutCard
                            icon="🎓"
                            title="Give Scholarship"
                            description="Education is the key to breaking the cycle of poverty. Your support can turn dreams into reality for deserving students. Give a scholarship today and invest in a brighter tomorrow."
                            link="/donate"
                            linkText="Give Scholarship"
                        />
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programsSection" style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Programs</h2>
                        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
                            We run various programs to address different needs in our communities.
                            Each program is designed to create lasting impact and positive change.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <ProgramCard
                            image="/image/gallery/1 gall.jpeg"
                            title="Education for Every Child"
                            goal="$9,845"
                        />
                        <ProgramCard
                            image="/image/gallery/2 gall.jpg"
                            title="Make Life Easier"
                            goal="$8,901"
                        />
                        <ProgramCard
                            image="/image/gallery/3 gall.jpg"
                            title="Helping Kids"
                            goal="$7,890"
                        />
                        <ProgramCard
                            image="/image/gallery/4 gall.jpeg"
                            title="Clean Water for People"
                            goal="$9,901"
                        />
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="educationSection" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Education</h2>
                        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
                            Education is the foundation of a better future. We believe every child
                            deserves access to quality education regardless of their circumstances.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="education-content">
                        <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                            <video autoPlay muted loop style={{ width: '100%', display: 'block' }}>
                                <source src="/video/Found.mp4" type="video/mp4" />
                                Your browser does not support HTML5 video
                            </video>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                                Education is Essential For <br />
                                <span className="gradient-text">BETTER FUTURE</span>
                            </h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                Education is vital for poor children as it offers a path out of
                                poverty and the chance for a better future. It provides knowledge,
                                skills, and confidence needed for good job opportunities and
                                informed decisions. Without education, many remain stuck in
                                hardship. By supporting their learning, we empower them to reach
                                their potential and contribute to society. Every child deserves the
                                chance to learn, grow, and succeed.
                            </p>
                            <Link to="/donate" className="btn btn-outline">Donate Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallerySection" style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Gallery</h2>
                        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
                            Take a look at our work and the impact we're making in communities
                            around the world. Every image tells a story of hope and transformation.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num) => (
                            <div key={num} className="gallery-item" style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.5rem', height: '200px' }}>
                                <img
                                    src={`/image/gallery/${num} gall.${num === 2 || num === 3 ? 'jpg' : 'jpeg'}`}
                                    alt={`Gallery ${num}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Section */}
            <section id="joinSection" style={{
                padding: '8rem 0',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(135deg, rgba(6, 8, 109, 0.97), rgba(172, 10, 91, 1)), url("/image/pattern.jpg")',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}>
                <div className="container animate-fade-in">
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                        Adopt a Child & <span className="gradient-text">Save Lives</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#e2e8f0' }}>
                        Adopting a child is one of the most powerful and life-changing acts of
                        compassion. It goes far beyond simply offering shelter — it means
                        giving a child a loving home, a sense of belonging, and a future
                        filled with hope and opportunity. Millions of children around the
                        world are living without families, vulnerable to poverty, neglect, and
                        exploitation. By choosing to adopt, you are not only changing the
                        course of one child's life but also enriching your own with love,
                        purpose, and joy.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/register" className="btn btn-outline">Join Us</Link>
                        <Link to="/donate" className="btn btn-primary">Adopt a Child</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AboutCard = ({ icon, title, description, link, linkText }) => (
    <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', transition: 'transform 0.3s ease' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{icon}</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{description}</p>
        <Link to={link} className="btn btn-primary">{linkText}</Link>
    </div>
);

const ProgramCard = ({ image, title, goal }) => (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ height: '200px', backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Donation Goal: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{goal}</span>
            </div>
            <Link to="/donate" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Donate Now</Link>
        </div>
    </div>
);

export default Home;
