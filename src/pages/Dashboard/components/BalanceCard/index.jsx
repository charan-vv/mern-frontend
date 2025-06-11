import { Card, Skeleton } from "antd";
import { useState } from "react";

const BalanceCards = ({ cards, loading }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const visibleCards = showAll ? cards : cards?.slice(0, 3);

  const handleCardClick = (cardId) => {
    setActiveCard(cardId === activeCard ? null : cardId);
  };

  return (
    <Card className="custom-card !w-[400px] !h-[400px]">
      <Skeleton loading={loading} active>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Balance Cards</h3>
          {cards?.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showAll ? "Show less" : "See all"}
            </button>
          )}
        </div>

        {/* Card Stack Container */}
        <div className="relative h-[320px] pr-2">
          {visibleCards?.map((card, index) => {
            const isActive = activeCard === card.id;
            const cardIndex = visibleCards.findIndex(c => c.id === card.id);
            const stackOffset = 20; // pixels between stacked cards
            
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`absolute w-full bg-gradient-to-r ${card.gradient} p-4 rounded-xl text-white transition-all duration-300 ease-in-out cursor-pointer
                  ${isActive ? 'z-50 shadow-xl' : 'z-10 hover:shadow-lg'}`}
                style={{
                  top: isActive ? '0' : `${cardIndex * stackOffset}px`,
                  transform: isActive ? 'scale(1.02) translateY(-5px)' : 'scale(1)',
                  transitionProperty: 'transform, top, box-shadow',
                  border: isActive ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                  opacity:  1 ,
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm">Debit Card</p>
                    <p className="text-xs opacity-80">Total Balance</p>
                  </div>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <p className="text-xl font-bold mb-2">{card.balance}</p>

                <div className="text-sm flex justify-between">
                  <span>Card Holder</span>
                  <span>Expired</span>
                </div>
                <div className="text-xs flex justify-between">
                  <span>{card.holderName}</span>
                  <span>{card.cardNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Skeleton>
    </Card>
  );
};

export default BalanceCards;