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
      text: 'Kính chào Quý khách! APEX có thể tiếp nhận nhu cầu về cửa thép, cửa kính, cửa cuốn và rèm ngăn cháy. Quý khách đang cần tư vấn sản phẩm nào?',
      timestamp: 'Vừa xong'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Cửa thép EI70, EI90 và EI120 khác nhau thế nào?',
    'Liên hệ kinh doanh về cửa thép',
    'Yêu cầu hồ sơ kỹ thuật sản phẩm',
    'Tư vấn cửa cuốn hoặc rèm ngăn cháy'
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
      let reply = 'Cảm ơn Quý khách đã quan tâm. Quý khách có thể gọi hoặc nhắn Zalo trực tiếp cho nhân viên kinh doanh APEX để trao đổi nhanh.';
      const lower = query.toLowerCase();

      if (lower.includes('ei70') || lower.includes('ei90') || lower.includes('tiêu chuẩn')) {
        reply = 'Cửa thép APEX có các cấu hình EI70, EI90 và EI120. Cấu hình phù hợp cần được đối chiếu với hồ sơ thiết kế và yêu cầu của từng vị trí lắp đặt.';
      } else if (lower.includes('giá') || lower.includes('báo giá') || lower.includes('chi phí')) {
        reply = 'Đơn giá được xác nhận theo kích thước, màu sơn, phụ kiện và cấu hình thực tế. Quý khách vui lòng gọi hoặc nhắn Zalo để nhân viên kinh doanh tư vấn trực tiếp.';
      } else if (lower.includes('cuốn') || lower.includes('nhà xưởng')) {
        reply = 'APEX có cung cấp cửa cuốn ngăn cháy. Thông số và đơn giá sẽ được tư vấn theo kích thước, cấu hình và yêu cầu thực tế của công trình.';
      } else if (lower.includes('rèm') || lower.includes('giếng trời')) {
        reply = 'APEX có cung cấp rèm ngăn cháy. Vui lòng gửi kích thước và vị trí lắp đặt để được tư vấn cấu hình phù hợp.';
      } else if (lower.includes('tem') || lower.includes('kiểm định') || lower.includes('cục')) {
        reply = 'Hồ sơ kiểm định và tài liệu kỹ thuật đang được APEX hoàn thiện. Quý khách có thể gửi yêu cầu để được cập nhật theo từng sản phẩm.';
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
              <span className="text-[10px] text-slate-400">Tiếp nhận cả ngày · Phản hồi trong 1-2 ngày</span>
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
          <span className="truncate">Kết nối trực tiếp với nhân viên kinh doanh</span>
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="text-red-600 font-bold hover:underline shrink-0 ml-2"
          >
            Liên hệ ngay
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
