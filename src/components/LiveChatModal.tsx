import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ShieldCheck, Flame, User, CheckCheck } from 'lucide-react';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'Kính chào Quý khách! Tôi là Kỹ sư Nguyễn Thành Long - Trưởng bộ phận Tư vấn Kỹ thuật PCCC APEX Việt Nam. Quý khách đang cần tư vấn cho công trình dân dụng hay nhà xưởng công nghiệp ạ?',
      timestamp: 'Vừa xong'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Quy định tiêu chuẩn EI60 vs EI90 theo QCVN 06:2022',
    'Báo giá cửa cuốn ngăn cháy siêu trường cho nhà xưởng',
    'Hồ sơ cấp tem kiểm định PCCC của Cục CS PCCC',
    'Tư vấn rèm ngăn cháy giếng trời TTTM'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate engineer response
    setTimeout(() => {
      let reply = 'Cảm ơn Quý khách đã quan tâm. Sản phẩm của APEX Việt Nam đều được đốt mẫu thực nghiệm tại Viện IBST và được Cục Cảnh sát PCCC & CNCH cấp tem kiểm định hợp quy.';
      const lower = query.toLowerCase();

      if (lower.includes('ei60') || lower.includes('ei90') || lower.includes('tiêu chuẩn')) {
        reply = 'Theo QCVN 06:2022/BXD, cửa chống cháy bắt buộc phải thỏa mãn đồng thời 2 chỉ số: E (Tính toàn vẹn - không nứt vỡ cho lửa xuyên qua) và I (Tính cách nhiệt - nhiệt độ mặt sau dưới 140°C). Cửa EI60 thường dùng cho buồng thang chung cư dưới 50m, còn EI90/EI120 dùng cho nhà cao tầng trên 50m và các phòng kỹ thuật điện.';
      } else if (lower.includes('giá') || lower.includes('báo giá') || lower.includes('chi phí')) {
        reply = 'Đơn giá cửa thép chống cháy APEX dao động từ 1.850.000đ/m² đối với dòng EI60 đến 2.450.000đ/m² đối với dòng EI120 (đã gồm khung, cánh, sơn tĩnh điện Jotun và phụ kiện chuẩn). Bạn có thể bấm nút "Nhận báo giá nhanh" để tạo bảng dự toán tự động ngay trên màn hình!';
      } else if (lower.includes('cuốn') || lower.includes('nhà xưởng')) {
        reply = 'Đối với nhà xưởng công nghiệp, cửa cuốn ngăn cháy APEX sử dụng nan thép kép 1.4mm nhồi bông gốm chịu nhiệt 1200°C, motor chịu nhiệt 300°C và cơ chế tự hạ trọng lực Fail-Safe khi mất điện hoàn toàn. Khẩu độ tối đa đạt tới 12 mét chiều rộng.';
      } else if (lower.includes('rèm') || lower.includes('giếng trời')) {
        reply = 'Rèm ngăn cháy APEX thiết kế âm trần thẩm mỹ tuyệt đối, vải sợi thủy tinh cốt inox gia cường chịu nhiệt 1000°C, đáp ứng tiêu chuẩn BS EN 12101-1, chuyên dùng cho sảnh thông tầng TTTM và giếng trời khách sạn.';
      } else if (lower.includes('tem') || lower.includes('kiểm định') || lower.includes('cục')) {
        reply = 'APEX Việt Nam cung cấp đầy đủ: Giấy chứng nhận kiểm định phương tiện PCCC của Cục Cảnh sát PCCC & CNCH, biên bản đốt mẫu tại Viện IBST và dán tem kiểm định điện tử QR code trên từng bộ cửa xuất xưởng.';
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full sm:w-[420px] h-[88vh] sm:h-[620px] max-h-[92vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col border border-neutral-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs">
                APEX
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Tư Vấn Kỹ Thuật PCCC APEX</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-[10px] text-slate-400">Trực tuyến · Sẵn sàng hỗ trợ 24/7</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice strip */}
        <div className="bg-neutral-100 px-3 py-1.5 text-[11px] text-slate-600 border-b border-neutral-200 flex items-center justify-between">
          <span className="truncate">Cung cấp báo giá & hồ sơ thẩm duyệt PCCC dự án</span>
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="text-red-600 font-bold hover:underline shrink-0 ml-2"
          >
            Tính giá nhanh
          </button>
        </div>

        {/* Message body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-red-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-neutral-200 shadow-xs'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1">
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></div>
              <span className="text-[10px] text-slate-500">Kỹ sư APEX đang nhập câu trả lời...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-2 border-t border-neutral-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] text-slate-600 bg-neutral-100 hover:bg-red-50 hover:text-red-600 border border-neutral-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-2.5 bg-white border-t border-neutral-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Nhập câu hỏi về kích thước, tiêu chuẩn, giá..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-neutral-200 rounded-full focus:outline-hidden focus:border-red-500 bg-neutral-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
