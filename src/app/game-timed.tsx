import { useCronometro } from '../hooks/useCronometro';

export default function TelaJogoTemporizado() {

  const totalRespondidas = 10; 

  const tempoRestante = useCronometro(30, () => {
    enviarPontuacao();
  });

  const enviarPontuacao = async () => {
    try {
      const response = await fetch('/api/timedscores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pontos: totalRespondidas,
        }),
      });

      if (response.ok) {
        console.log('Dados enviados');
      } else {
        console.error('Erro ao enviar pontuação');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  };
}


