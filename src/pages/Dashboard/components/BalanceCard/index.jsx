import { Card, Skeleton, Avatar, Button } from "antd";
import { useState } from "react";
import { ArrowRightOutlined, CreditCardOutlined } from "@ant-design/icons";

const BalanceCards = ({ cards, loading }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  const visibleCards = showAll ? cards : cards?.slice(0, 3);

  return (
    <Card
      className="h-full"
      title={
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold flex items-center gap-2">
            <CreditCardOutlined /> Balance Cards
          </span>
          {cards?.length > 3 && (
            <Button
              type="text"
              size="small"
              onClick={() => setShowAll(!showAll)}
              icon={<ArrowRightOutlined rotate={showAll ? 270 : 90} />}
            >
              {showAll ? "Less" : "More"}
            </Button>
          )}
        </div>
      }
    >
      <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
        <div className="flex flex-col gap-4">
          {visibleCards.map((card, index) => (
            <div
              key={card.id}
              className={`relative p-4 rounded-xl text-white cursor-pointer transition-all duration-300 ${
                activeCard === index ? "scale-[1.02] shadow-lg" : ""
              }`}
              style={{
                background: card.gradient,
                minHeight: "160px",
              }}
              onClick={() => setActiveCard(index)}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm opacity-80">Debit Card</p>
                  <p className="text-xs opacity-60">Total Balance</p>
                </div>
                <Avatar
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  size="small"
                >
                  {card.bank.charAt(0)}
                </Avatar>
              </div>

              <p className="text-2xl font-bold mb-2">${card.balance}</p>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Card Holder</span>
                  <span className="opacity-80">Expires</span>
                </div>
                <div className="flex justify-between text-base font-medium">
                  <span>{card.holderName}</span>
                  <span>{card.expiry}</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 text-xs font-mono tracking-widest">
                •••• •••• •••• {card.cardNumber.slice(-4)}
              </div>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  );
};

export default BalanceCards;