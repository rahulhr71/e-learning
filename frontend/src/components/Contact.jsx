import React from "react";
import { Phone, Mail } from "lucide-react";
import MapComponent from "./MapComponent";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Contact = () => {
    return (
        <>
            <Navbar /><br /><br />
            <section className=" font-Exo grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-lg">

                <div className="flex flex-col justify-center p-8 md:p-12 space-y-10   ">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Need a Direct Line?
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Cras massa et odio donec faucibus in. Vitae pretium massa dolor
                            ullamcorper lectus elit quam.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Phone */}
                        <div className="flex items-center space-x-5">
                            <div className="bg-blue-600 p-4 rounded-xl shadow-md">
                                <Phone className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                                <a
                                    href="tel:1234567890"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    (123) 456 7890
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center space-x-5">
                            <div className="bg-blue-600 p-4 rounded-xl shadow-md">
                                <Mail className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                                <a
                                    href="mailto:contact@thimpress.com"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    contact@thimpress.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Map */}
                <div className="h-[300px] md:h-auto p-10 z-0">
                    <MapComponent />
                </div>
            </section>
            <div >
                <div className='w-4/5 m-auto mt-10'>
                    <h1 className='text-gray-500 font-Exo text-xl'>Contact us</h1>
                    <form className='w-2/3 grid grid-cols-1 grid-rows-2 p-3  '>
                        <div className='flex gap-5'> <input type="text" placeholder="Name*" className='px-3 placeholder:text-gray-400 h-10 focus:border-0 border border-gray-400 rounded-sm flex-1' />
                            <input type="email" placeholder="Email*" className='flex-1 px-3 placeholder:text-gray-400 border border-gray-400 h-10 rounded-sm ' />
                        </div>
                        <textarea name="comment" id="" placeholder='Message*' className='p-4 placeholder:text-gray-400 h-20 border border-gray-400 rounded-sm '></textarea>
                        <button className='ml-0 bg-amber-600 p-3 m-5 rounded-2xl text-white font-bold cursor-pointer hover:bg-amber-500' onClick={(e) => e.preventDefault()}>Send Message</button>
                    </form>
                    <br /><br />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
