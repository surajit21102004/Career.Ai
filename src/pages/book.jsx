import React, { useState, useEffect } from 'react';
import { Clock, Mail, Phone, User, CheckCircle, Calendar, Send, Download, Share2, ArrowRight, Zap, Target, MessageSquare } from 'lucide-react';
import qrImage from '../assets/qr.jpg';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';

const BookingPage = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [timer, setTimer] = useState(240);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reason: '',
    selectedDate: '',
    selectedTime: ''
  });

  const steps = [
    {
      number: 1,
      title: "Select Your Session Type",
      description: "Choose between Free 15-min consultation or Premium 30-min session",
      icon: Target
    },
    {
      number: 2,
      title: "Pick Date & Time",
      description: "Select a convenient date and time slot that works for you",
      icon: Calendar
    },
    {
      number: 3,
      title: "Fill Contact Details",
      description: "Provide your information and reason for booking",
      icon: User
    },
    {
      number: 4,
      title: "Confirm Booking",
      description: "Complete payment (if premium) and receive confirmation",
      icon: CheckCircle
    }
  ];

  const sessionTypes = [
    {
      type: 'free',
      title: 'Free Consultation',
      duration: '15 minutes',
      price: 0,
      features: [
        'Quick Career Assessment',
        'Basic Guidance',
        'Q&A Session',
        'Next Steps Advice'
      ],
      badge: 'Limited Slots',
      color: 'cyan'
    },
    {
      type: 'paid',
      title: 'Premium Session',
      duration: '30 minutes',
      price: 199,
      features: [
        'Resume Review & Update',
        'Detailed Career Path Planning',
        'Interview Tips & Tricks',
        'Professional Grooming Guide',
        'Personalized Action Plan'
      ],
      badge: 'Most Popular',
      color: 'purple'
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  const reasons = [
    'Career Related Guidance',
    'Professional Grooming',
    'Career Path Detection',
    'Resume Review',
    'Interview Preparation',
    'Other'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showQR && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
    if (timer === 0) {
      setShowQR(false);
      setTimer(240);
    }
  }, [showQR, timer]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowHowItWorks(false);
    setShowDatePicker(true);
  };

  const handleDateSelect = (date) => {
    setFormData({ ...formData, selectedDate: date });
    setShowTimePicker(true);
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, selectedTime: time });
    setShowForm(true);
  };

 const handleSubmit = () => {
  if (!formData.name || !formData.phone || !formData.reason) {
    alert('Please fill all fields');
    return;
  }

  const templateParams = {
    name: formData.name,
    phone: formData.phone,
    reason: formData.reason,
    date: formData.selectedDate,
    time: formData.selectedTime,
    session_type: selectedPlan.title,
    amount: selectedPlan.price,
    year: new Date().getFullYear(),
  };

  emailjs
    .send(
      'service_lfmk42c',
      'template_7564n47',
      templateParams,
      'TbKT51ao5KJf0E_XL' // 🔴 replace this
    )
    .then(
    () => {
      if (selectedPlan.type === 'paid') {
        setShowQR(true);
      } else {
        toast.success('We will contact you within 24 hours!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        resetForm();
      }
    },
    (error) => {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send email. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  );

};

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      reason: '',
      selectedDate: '',
      selectedTime: ''
    });
    setSelectedPlan(null);
    setShowForm(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowHowItWorks(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

 const handleWhatsAppShare = () => {
  const message = `Hi! I've booked a ${selectedPlan.title} session for ${formData.selectedDate} at ${formData.selectedTime}. I've completed the payment. Please find the details below.`;
  
  window.open(
    `https://wa.me/919433284087?text=${encodeURIComponent(message)}`,
    '_blank'
  );
};


  const handleDownloadQR = () => {
    alert('QR Code download feature - Integration needed');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[128px]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Book Your Session
            </span>
          </h1>
          <p className="text-xl text-gray-300">Professional career guidance at your fingertips</p>
        </div>

        {/* How It Works Section - Animated */}
        {showHowItWorks && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === index;
                return (
                  <div
                    key={index}
                    className={`relative transition-all duration-500 ${
                      isActive ? 'scale-110' : 'scale-100 opacity-60'
                    }`}
                  >
                    <div className={`bg-zinc-900/50 backdrop-blur-xl p-6 rounded-xl border ${
                      isActive ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-zinc-800'
                    }`}>
                      <div className={`w-16 h-16 rounded-full ${
                        isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-zinc-800'
                      } flex items-center justify-center mb-4 mx-auto`}>
                        <Icon size={32} className="text-white" />
                      </div>
                      <div className={`text-center mb-2 text-2xl font-bold ${
                        isActive ? 'text-cyan-400' : 'text-gray-500'
                      }`}>
                        Step {step.number}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-400 text-center">
                        {step.description}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Session Selection */}
        {!selectedPlan && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {sessionTypes.map((session, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handlePlanSelect(session)}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${
                    session.color === 'cyan' 
                      ? 'from-cyan-500 to-blue-500' 
                      : 'from-purple-500 to-pink-500'
                  } rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300`}></div>
                  
                  <div className="relative bg-zinc-900 p-8 rounded-2xl border border-zinc-800 h-full">
                    {/* Badge */}
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 ${
                      session.color === 'cyan' ? 'bg-cyan-500' : 'bg-purple-500'
                    } rounded-full text-sm font-bold`}>
                      {session.badge}
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{session.title}</h3>
                      <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                        <Clock size={20} />
                        <span>{session.duration}</span>
                      </div>
                      <div className="text-4xl font-bold">
                        {session.price === 0 ? (
                          <span className="text-cyan-400">FREE</span>
                        ) : (
                          <span className="text-purple-400">₹{session.price}</span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {session.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className={`${
                            session.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
                          } flex-shrink-0 mt-0.5`} size={20} />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                      session.color === 'cyan'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500'
                    } shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]`}>
                      Select Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date Picker */}
    {showDatePicker && !formData.selectedDate && (
  <div className="mb-16 animate-fadeIn px-2 sm:px-0">
    <div className="max-w-3xl mx-auto bg-zinc-900/50 backdrop-blur-xl p-4 sm:p-8 rounded-2xl border border-cyan-500/30">
      
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-cyan-400">
        Select Date
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 sm:gap-4">
        {[...Array(28)].map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);

          const dateStr = date.toISOString().split('T')[0];
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = date.getDate();

          return (
            <button
              key={index}
              onClick={() => handleDateSelect(dateStr)}
              className="p-3 sm:p-4 bg-zinc-800 
                         hover:bg-gradient-to-r 
                         hover:from-cyan-500 hover:to-blue-600 
                         rounded-lg transition-all 
                         text-center border border-zinc-700 hover:border-cyan-500"
            >
              <div className="text-[10px] sm:text-xs text-gray-400">
                {dayName}
              </div>
              <div className="text-base sm:text-lg font-bold">
                {dayNum}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
)}


        {/* Time Picker */}
        {showTimePicker && !formData.selectedTime && (
          <div className="mb-16 animate-fadeIn">
            <div className="max-w-3xl mx-auto bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-cyan-500/30">
              <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">Select Time</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className="p-4 bg-zinc-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 rounded-lg transition-all font-semibold border border-zinc-700 hover:border-cyan-500 flex items-center justify-center gap-2"
                  >
                    <Clock size={18} />
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        {showForm && !showQR && (
          <div className="mb-16 animate-fadeIn">
            <div className="max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-cyan-500/30">
              <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">Your Details</h2>
              
              {/* Selected Info */}
              <div className="bg-zinc-800/50 p-4 rounded-lg mb-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Session Type:</span>
                  <span className="font-semibold text-cyan-400">{selectedPlan.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold">{new Date(formData.selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Time:</span>
                  <span className="font-semibold">{formData.selectedTime}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Reason for Booking</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
                    <select
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a reason</option>
                      {reasons.map((reason, index) => (
                        <option key={index} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-bold text-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] flex items-center justify-center gap-3"
                >
                  {selectedPlan.type === 'free' ? (
                    <>
                      <CheckCircle size={24} />
                      Confirm Free Booking
                    </>
                  ) : (
                    <>
                      <ArrowRight size={24} />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Payment */}
        {showQR && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-zinc-900 rounded-2xl p-8 max-w-md w-full border border-cyan-500/30 relative">
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">Complete Payment</h3>
                <p className="text-gray-400">Scan QR code to pay ₹{selectedPlan.price}</p>
              </div>

              {/* Timer */}
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 text-red-400 font-bold">
                  <Clock size={20} />
                  Time Remaining: {formatTime(timer)}
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-white p-6 rounded-lg mb-6">
  <div className="aspect-square rounded-lg overflow-hidden flex items-center justify-center">
    <img
      src={qrImage}
      alt="Payment QR Code"
      className="w-full h-full object-contain"
    />
  </div>
  <p className="text-center text-black font-bold mt-4">
    Amount: ₹{selectedPlan.price}
  </p>
</div>


              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Share2 size={20} />
                  Send SS to WhatsApp
                </button>
                <button
                  onClick={handleDownloadQR}
                  className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Download size={20} />
                  Download QR Code
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Payment confirmation will be sent via email within 5 minutes
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>
    </div>
    
  );
  
};

export default BookingPage;