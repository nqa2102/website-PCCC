import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ShieldCheck, Flame, User, CheckCheck, Phone, Calculator, MessageCircle } from 'lucide-react';
import { useLiveData } from '../admin/adminData';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

interface MessageAction {
  label: string;
  type: 'quote' | 'call' | 'zalo';
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  actions?: MessageAction[];
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote
}) => {
  const { company } = useLiveData();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'Kính chào Quý khách! Kỹ sư tư vấn PCCC APEX sẵn sàng hỗ trợ. Quý khách đang cần tư vấn cấu hình sản phẩm nào hoặc cần hỗ trợ hồ sơ kiểm định theo QCVN 06?',
      timestamp: 'Vừa xong',
      actions: [
        { label: 'Nhận báo giá dự toán', type: 'quote' },
        { label: 'Gọi hotline kỹ sư', type: 'call' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Quy chuẩn QCVN 06:2022/BXD',
    'Cửa thép EI70, EI90, EI120',
    'Nhận báo giá dự toán',
    'Chiều mở cửa & thanh panic bar',
    'Cửa cuốn & rèm ngăn cháy'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleActionClick = (action: MessageAction) => {
    if (action.type === 'quote') {
      onClose();
      onOpenQuote();
    } else if (action.type === 'call') {
      window.location.href = company.hotlineHref;
    } else if (action.type === 'zalo') {
      window.open(company.zaloHref, '_blank');
    }
  };

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
      let reply = 'Cảm ơn Quý khách đã quan tâm. Quý khách có thể yêu cầu bảng báo giá dự toán trực tiếp hoặc gọi hotline để kỹ sư APEX trao đổi nhanh về bản vẽ công trình.';
      let actions: MessageAction[] = [
        { label: 'Điền form nhận báo giá', type: 'quote' },
        { label: `Gọi ${company.hotlineDisplay}`, type: 'call' }
      ];

      const lower = query.toLowerCase();

      if (lower.includes('06') || lower.includes('qcvn') || lower.includes('tiêu chuẩn') || lower.includes('nghiệm thu')) {
        reply = 'Theo QCVN 06:2022/BXD và Sửa đổi 1:2023, cửa chống cháy phải đáp ứng đồng thời tiêu chí E (tính toàn vẹn) và I (tính cách nhiệt). Ví dụ cửa buồng thang thoát hiểm thông thường yêu cầu tối thiểu EI60 hoặc EI70. APEX cung cấp hồ sơ kiểm định mẫu phương tiện PCCC đầy đủ theo quy chuẩn hiện hành.';
        actions = [
          { label: 'Xem tài liệu kiểm định', type: 'quote' },
          { label: 'Tư vấn hồ sơ công trình', type: 'call' }
        ];
      } else if (lower.includes('ei70') || lower.includes('ei90') || lower.includes('ei120') || lower.includes('cửa thép')) {
        reply = 'Cửa thép ngăn cháy APEX sử dụng thép cán nguội kết hợp lõi cách nhiệt bông gốm Ceramic, MGO hoặc bông thủy tinh tỷ trọng cao. Các dải chịu lửa bao gồm EI70, EI90 và EI120 được thử nghiệm đốt mẫu thực tế. Kích thước tiêu chuẩn hoặc sản xuất theo số đo khảo sát.';
        actions = [
          { label: 'Báo giá cửa thép', type: 'quote' },
          { label: 'Nhắn Zalo nhân viên', type: 'zalo' }
        ];
      } else if (lower.includes('giá') || lower.includes('báo giá') || lower.includes('chi phí') || lower.includes('bao nhiêu')) {
        reply = 'Đơn giá hoàn thiện phụ thuộc vào: giới hạn chịu lửa EI, kích thước (Cao x Rộng), số cánh, loại phụ kiện (tay co, thanh panic bar, ô kính) và bảng màu sơn Jotun. Quý khách có thể mở bảng tính báo giá dự toán để nhận phương án nhanh.';
        actions = [
          { label: 'Nhận báo giá dự toán ngay', type: 'quote' },
          { label: 'Gọi hotline kinh doanh', type: 'call' }
        ];
      } else if (lower.includes('panic') || lower.includes('chiều mở') || lower.includes('thoát nạn') || lower.includes('tay co')) {
        reply = 'Cửa thoát nạn buồng thang bộ bắt buộc phải mở theo chiều thoát nạn (từ trong hành lang ra phía buồng thang) và trang bị tay co thủy lực tự đóng kín khí. Tại khu vực tập trung đông người, cửa cần lắp khóa thanh thoát hiểm (Panic bar) để người thoát có thể ấn mở nhanh chóng khi gặp sự cố.';
        actions = [
          { label: 'Báo giá kèm thanh Panic', type: 'quote' },
          { label: 'Tư vấn quy chuẩn cửa', type: 'call' }
        ];
      } else if (lower.includes('cuốn') || lower.includes('nhà xưởng') || lower.includes('kho')) {
        reply = 'Cửa cuốn ngăn cháy cách nhiệt APEX (dòng AKS) đạt giới hạn chịu lửa EI70 và EI92 theo TCVN 9383:2012, chuyên dụng cho các khoảng mở siêu trường trong nhà máy, nhà kho, hầm để xe hoặc phân khoang diện tích lớn.';
        actions = [
          { label: 'Báo giá cửa cuốn PCCC', type: 'quote' },
          { label: 'Trao đổi kỹ thuật', type: 'call' }
        ];
      } else if (lower.includes('rèm') || lower.includes('giếng trời') || lower.includes('thông tầng') || lower.includes('ngăn khói')) {
        reply = 'Rèm ngăn cháy/ngăn khói tự động APEX (dòng AKF) đạt EI60 và EI91, thiết kế giấu kín trên trần thạch cao, tự động hạ xuống khi nhận tín hiệu báo cháy từ tủ trung tâm hoặc rơ-le nhiệt, tối ưu thẩm mỹ cho giếng trời TTTM và khách sạn.';
        actions = [
          { label: 'Báo giá rèm ngăn cháy', type: 'quote' },
          { label: 'Nhắn Zalo', type: 'zalo' }
        ];
      } else if (lower.includes('tem') || lower.includes('kiểm định') || lower.includes('cục pccc') || lower.includes('hồ sơ')) {
        reply = 'Hồ sơ kiểm định APEX được đối chiếu theo đúng mã hiệu cấu hình đốt mẫu tại phòng thử nghiệm được Bộ Xây dựng & Cục Cảnh sát PCCC chỉ định (như Viện IBST hoặc TT2), hỗ trợ nhà thầu nghiệm thu công trình thuận lợi.';
        actions = [
          { label: 'Yêu cầu gửi hồ sơ mẫu', type: 'quote' },
          { label: 'Gọi hỗ trợ pháp lý', type: 'call' }
        ];
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        actions
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
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
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleActionClick(act)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
                      >
                        {act.type === 'quote' && <Calculator className="h-3 w-3" />}
                        {act.type === 'call' && <Phone className="h-3 w-3" />}
                        {act.type === 'zalo' && <MessageCircle className="h-3 w-3" />}
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}
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
