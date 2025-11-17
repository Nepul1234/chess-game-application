import { getCapturedPieces, getPieceSymbol, calculateMaterialAdvantage } from '../../utils/helpers';

export const CapturedPieces = ({ gameHistory, game }) => {
  const captured = getCapturedPieces(gameHistory);
  const materialAdvantage = calculateMaterialAdvantage(game);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Captured Pieces
      </h3>

      <div className="space-y-3">
        {/* White Captured (by Black) */}
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            White Pieces Lost
          </div>
          <div className="flex flex-wrap gap-1 min-h-[32px]">
            {captured.white.length > 0 ? (
              captured.white.map((piece, idx) => (
                <span key={idx} className="text-2xl">
                  {getPieceSymbol(piece, 'w')}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 dark:text-gray-500">None</span>
            )}
          </div>
        </div>

        {/* Black Captured (by White) */}
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Black Pieces Lost
          </div>
          <div className="flex flex-wrap gap-1 min-h-[32px]">
            {captured.black.length > 0 ? (
              captured.black.map((piece, idx) => (
                <span key={idx} className="text-2xl">
                  {getPieceSymbol(piece, 'b')}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 dark:text-gray-500">None</span>
            )}
          </div>
        </div>

        {/* Material Advantage */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Material Advantage
          </div>
          <div className="text-lg font-bold">
            {materialAdvantage > 0 ? (
              <span className="text-green-600 dark:text-green-400">
                White +{materialAdvantage}
              </span>
            ) : materialAdvantage < 0 ? (
              <span className="text-blue-600 dark:text-blue-400">
                Black +{Math.abs(materialAdvantage)}
              </span>
            ) : (
              <span className="text-gray-600 dark:text-gray-400">
                Equal
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
