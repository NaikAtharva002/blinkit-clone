import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BlinkitLogo } from '../common/BlinkitLogo';
import { X, ArrowLeft, ShieldCheck, Smartphone } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isLoginModalOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setStep('otp');
      setTimer(30);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (val && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }

    // Auto-submit if all 4 entered
    if (newOtp.every((digit) => digit !== '')) {
      setTimeout(() => {
        login(phoneNumber, 'Atharva');
        resetState();
      }, 400);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  const resetState = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp(['', '', '', '']);
    setTimer(30);
  };

  const handleClose = () => {
    resetState();
    closeLoginModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'otp' && (
          <button
            onClick={() => setStep('phone')}
            className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* Brand Header */}
        <div className="flex flex-col items-center mt-2 mb-6">
          <BlinkitLogo size="lg" />
          <h2 className="text-xl font-black text-[#1C1C1C] mt-3">
            India's last minute app
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {step === 'phone' ? 'Log in or Sign up' : 'Verification code sent'}
          </p>
        </div>

        {step === 'phone' ? (
          /* Phone Entry */
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden focus-within:border-[#0C831F] transition-all bg-gray-50/50">
              <div className="px-3 py-3 border-r border-gray-200 text-xs font-bold text-gray-700 bg-gray-100 flex items-center gap-1">
                <span>🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter mobile number"
                className="w-full px-3 py-3 text-sm font-semibold text-[#1C1C1C] bg-transparent focus:outline-none tracking-wider"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={phoneNumber.length !== 10}
              className="w-full py-3.5 rounded-xl bg-[#0C831F] hover:bg-[#096618] disabled:bg-gray-200 disabled:text-gray-400 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
            >
              Continue
            </button>

            <p className="text-[10px] text-gray-400 leading-tight pt-2">
              By continuing, you agree to our{' '}
              <a href="#" className="underline text-gray-600">Terms of service</a> &{' '}
              <a href="#" className="underline text-gray-600">Privacy policy</a>
            </p>
          </form>
        ) : (
          /* OTP Entry */
          <div className="space-y-4">
            <p className="text-xs text-gray-600">
              We have sent a 4-digit code to <strong className="text-gray-900">+91 {phoneNumber}</strong>
            </p>

            <div className="flex justify-center gap-2.5 my-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpInputRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-13 text-center text-xl font-black rounded-xl border border-gray-300 focus:border-[#0C831F] focus:ring-2 focus:ring-green-100 focus:outline-none transition-all bg-gray-50"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            <p className="text-[11px] text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg font-medium inline-block">
              💡 Demo Mode: Enter any 4 digits (e.g. 1 2 3 4)
            </p>

            <div className="pt-2 text-xs text-gray-500">
              {timer > 0 ? (
                <span>Resend code in <strong className="text-gray-800">{timer}s</strong></span>
              ) : (
                <button
                  onClick={() => setTimer(30)}
                  className="text-[#0C831F] font-bold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              onClick={() => {
                login(phoneNumber, 'Atharva');
                resetState();
              }}
              disabled={otp.some((d) => d === '')}
              className="w-full py-3.5 rounded-xl bg-[#0C831F] hover:bg-[#096618] disabled:bg-gray-200 disabled:text-gray-400 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md mt-4"
            >
              Verify & Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
